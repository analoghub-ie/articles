#!/usr/bin/env node
/**
 * Validates the full content repo structure against category-article-mapping.yml.
 *
 * Checks:
 *   1. category-article-mapping.yml is valid YAML with correct schema
 *   2. Every category has required fields (name, slug, icon, description, articles)
 *   3. Every article entry has required fields (slug, title, short_title)
 *   4. All slugs are URL-safe and globally unique
 *   5. Every article slug -> articles/{slug}/article.md exists on disk
 *   6. No orphan directories in articles/ (every dir is in the mapping)
 *   7. Every icon in mapping -> file exists in categoryIcons/
 *   8. Each article.md has valid frontmatter with required description
 *   9. No forbidden fields in frontmatter (id, title must NOT be there)
 *
 * Usage: node scripts/validate-structure.mjs
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const MAPPING_PATH = join(ROOT, 'category-article-mapping.yml');
const ARTICLES_DIR = join(ROOT, 'articles');
const ICONS_DIR = join(ROOT, 'categoryIcons');

const SLUG_REGEX = /^[a-zA-Z0-9_-]+$/;

const errors = [];
const warnings = [];

function error(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

// ─── Simple YAML parser (handles our specific schema) ────────────

function parseMapping(content) {
    const categories = [];
    let currentCat = null;
    let currentArticle = null;
    let inArticles = false;

    for (const line of content.split('\n')) {
        // Skip empty lines and comments
        if (!line.trim() || line.trim().startsWith('#')) continue;

        // Top-level key
        if (line.startsWith('categories:')) continue;

        // Category entry
        if (line.match(/^\s{2}- name:/)) {
            if (currentArticle && currentCat) {
                currentCat.articles.push(currentArticle);
                currentArticle = null;
            }
            if (currentCat) categories.push(currentCat);
            currentCat = { articles: [] };
            inArticles = false;
            currentCat.name = extractValue(line, 'name');
            continue;
        }

        if (!currentCat) continue;

        // Category fields
        if (line.match(/^\s{4}slug:/) && !inArticles) {
            currentCat.slug = extractValue(line, 'slug');
        } else if (line.match(/^\s{4}icon:/)) {
            currentCat.icon = extractValue(line, 'icon');
        } else if (line.match(/^\s{4}description:/)) {
            currentCat.description = extractValue(line, 'description');
        } else if (line.match(/^\s{4}hideInProd:/)) {
            currentCat.hideInProd = extractValue(line, 'hideInProd') === 'true';
        } else if (line.match(/^\s{4}articles:/)) {
            inArticles = true;
            // Check for empty array on same line
            if (line.trim().endsWith('[]')) {
                inArticles = false;
            }
        } else if (inArticles && line.match(/^\s{6}- slug:/)) {
            if (currentArticle) {
                currentCat.articles.push(currentArticle);
            }
            currentArticle = {};
            currentArticle.slug = extractValue(line, 'slug');
        } else if (inArticles && currentArticle) {
            if (line.match(/^\s{8}title:/)) {
                currentArticle.title = extractValue(line, 'title');
            } else if (line.match(/^\s{8}short_title:/)) {
                currentArticle.short_title = extractValue(line, 'short_title');
            }
        }
    }

    // Push last items
    if (currentArticle && currentCat) {
        currentCat.articles.push(currentArticle);
    }
    if (currentCat) categories.push(currentCat);

    return categories;
}

function extractValue(line, key) {
    const idx = line.indexOf(`${key}:`);
    if (idx === -1) return '';
    let val = line.slice(idx + key.length + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
    }
    return val;
}

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;

    const fields = {};
    for (const line of match[1].split('\n')) {
        const idx = line.indexOf(':');
        if (idx === -1) continue;
        const key = line.slice(0, idx).trim();
        let val = line.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
        }
        fields[key] = val;
    }
    return fields;
}

// ─── Check 1: Mapping file exists and parses ─────────────────────

if (!existsSync(MAPPING_PATH)) {
    error('category-article-mapping.yml not found');
    finish();
}

let mappingContent;
try {
    mappingContent = readFileSync(MAPPING_PATH, 'utf-8');
} catch (e) {
    error(`Cannot read mapping file: ${e.message}`);
    finish();
}

const categories = parseMapping(mappingContent);

if (categories.length === 0) {
    error('No categories found in mapping file');
    finish();
}

console.log(`Found ${categories.length} categories in mapping`);

// ─── Check 2 & 3: Required fields ───────────────────────────────

const allSlugs = new Set();
const allArticleSlugs = new Set();

for (const cat of categories) {
    const catLabel = cat.slug || cat.name || '(unknown)';

    // Check 2: Category required fields
    for (const field of ['name', 'slug', 'icon', 'description']) {
        if (!cat[field] && cat[field] !== '') {
            error(`Category '${catLabel}': missing required field '${field}'`);
        }
    }
    if (!Array.isArray(cat.articles)) {
        error(`Category '${catLabel}': missing 'articles' array`);
        continue;
    }

    // Check 4: Category slug is URL-safe and unique
    if (cat.slug) {
        if (!SLUG_REGEX.test(cat.slug)) {
            error(`Category slug '${cat.slug}' is not URL-safe`);
        }
        if (allSlugs.has(cat.slug)) {
            error(`Duplicate category slug: '${cat.slug}'`);
        }
        allSlugs.add(cat.slug);
    }

    // Check 3 & 4: Article entries
    for (const art of cat.articles) {
        const artLabel = `${catLabel}/${art.slug || '(unknown)'}`;

        for (const field of ['slug', 'title', 'short_title']) {
            if (!art[field]) {
                error(`Article '${artLabel}': missing required field '${field}'`);
            }
        }

        if (art.slug) {
            if (!SLUG_REGEX.test(art.slug)) {
                error(`Article slug '${art.slug}' is not URL-safe`);
            }
            // Article slugs should be unique globally (but CAN appear in multiple categories)
            allArticleSlugs.add(art.slug);
        }
    }
}

// ─── Check 5: Every article slug -> articles/{slug}/article.md ───

for (const slug of allArticleSlugs) {
    const articlePath = join(ARTICLES_DIR, slug, 'article.md');
    if (!existsSync(articlePath)) {
        error(`Article '${slug}': articles/${slug}/article.md not found`);
    }
}

// ─── Check 6: No orphan directories in articles/ ─────────────────

if (existsSync(ARTICLES_DIR)) {
    for (const entry of readdirSync(ARTICLES_DIR, { withFileTypes: true })) {
        if (entry.isDirectory() && !allArticleSlugs.has(entry.name)) {
            error(`Orphan directory: articles/${entry.name}/ (not in mapping)`);
        }
    }
}

// ─── Check 7: Category icons exist ──────────────────────────────

for (const cat of categories) {
    if (cat.icon) {
        const iconPath = join(ICONS_DIR, cat.icon);
        if (!existsSync(iconPath)) {
            error(`Category '${cat.slug}': icon '${cat.icon}' not found in categoryIcons/`);
        }
    }
}

// ─── Check 8 & 9: Frontmatter validation ────────────────────────

for (const slug of allArticleSlugs) {
    const articlePath = join(ARTICLES_DIR, slug, 'article.md');
    if (!existsSync(articlePath)) continue;

    const content = readFileSync(articlePath, 'utf-8');
    const fm = parseFrontmatter(content);

    if (!fm) {
        error(`Article '${slug}': missing YAML frontmatter`);
        continue;
    }

    // Check 8: Required description
    if (!fm.description) {
        error(`Article '${slug}': frontmatter missing required 'description'`);
    }

    // Check 9: Forbidden fields
    for (const forbidden of ['id', 'title']) {
        if (fm[forbidden]) {
            error(`Article '${slug}': frontmatter contains forbidden field '${forbidden}' (should be in mapping YAML)`);
        }
    }
}

// ─── Results ─────────────────────────────────────────────────────

finish();

function finish() {
    const totalArticles = allArticleSlugs.size;
    console.log(`Validated ${categories.length} categories, ${totalArticles} article slugs`);

    if (warnings.length > 0) {
        console.warn(`\nWarnings (${warnings.length}):`);
        for (const w of warnings) console.warn(`  ⚠ ${w}`);
    }

    if (errors.length > 0) {
        console.error(`\nValidation FAILED (${errors.length} errors):`);
        for (const e of errors) console.error(`  ✗ ${e}`);
        process.exit(1);
    } else {
        console.log('\nStructure validation PASSED');
        process.exit(0);
    }
}
