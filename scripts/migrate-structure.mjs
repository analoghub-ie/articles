#!/usr/bin/env node
/**
 * Migration script — restructures the content repo from category-based
 * to per-article folder layout.
 *
 * Old: articles/{categoryId}/{slug}.md + images/{category}/file.ext
 * New: articles/{slug}/article.md   + articles/{slug}/images/file.ext
 *
 * Also generates:
 *   - category-article-mapping.yml
 *   - categoryIcons/ (from images/categoryLogos/)
 *   - transformed dates.yaml (keys: slug only)
 *
 * Usage: node scripts/migrate-structure.mjs [--dry-run]
 */

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync, renameSync, statSync } from 'fs';
import { join, basename, dirname, relative } from 'path';

const ROOT = process.cwd();
const DRY_RUN = process.argv.includes('--dry-run');

// ─── Helpers ─────────────────────────────────────────────────────

function log(msg) { console.log(msg); }
function warn(msg) { console.warn(`  WARN: ${msg}`); }

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return { fields: {}, body: content };

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
    const body = content.slice(match[0].length);
    return { fields, body };
}

function yamlEscape(str) {
    if (/[:#\[\]{}|>&*!%@`,?]/.test(str) || str !== str.trim() || str === '') {
        return `"${str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
    }
    return `"${str}"`;
}

function generateShortTitle(title) {
    if (title.length <= 20) return title;
    const words = title.split(/\s+/);
    let result = '';
    for (const word of words) {
        const candidate = result ? `${result} ${word}` : word;
        if (candidate.length > 20) break;
        result = candidate;
    }
    return result || title.slice(0, 20);
}

function findAllFiles(dir) {
    const results = [];
    if (!existsSync(dir)) return results;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...findAllFiles(full));
        } else {
            results.push(full);
        }
    }
    return results;
}

// ─── Step 1: Parse current categories.yaml ───────────────────────

log('=== Content Repo Migration ===\n');
if (DRY_RUN) log('(DRY RUN — no files will be modified)\n');

const catYamlPath = join(ROOT, 'articles', 'categories.yaml');
const catRaw = readFileSync(catYamlPath, 'utf-8');

// Simple YAML array parser for our flat format
const categories = [];
let current = null;
for (const line of catRaw.split('\n')) {
    if (line.startsWith('- ')) {
        if (current) categories.push(current);
        current = {};
        const rest = line.slice(2);
        const idx = rest.indexOf(':');
        if (idx !== -1) {
            const key = rest.slice(0, idx).trim();
            let val = rest.slice(idx + 1).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
            current[key] = val;
        }
    } else if (current && line.match(/^\s+\w/)) {
        const trimmed = line.trim();
        const idx = trimmed.indexOf(':');
        if (idx !== -1) {
            const key = trimmed.slice(0, idx).trim();
            let val = trimmed.slice(idx + 1).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
            if (val === 'true') val = true;
            else if (val === 'false') val = false;
            current[key] = val;
        }
    }
}
if (current) categories.push(current);

log(`Found ${categories.length} categories:`);
for (const c of categories) log(`  - ${c.id}: ${c.title} (${c.hideInProd ? 'hidden' : 'visible'})`);

// ─── Step 2: Parse all articles + build image ownership ──────────

log('\n--- Parsing articles ---');

const categoryArticles = new Map();
const allArticles = new Map();
const slugToCats = new Map();

for (const cat of categories) {
    const catDir = join(ROOT, 'articles', cat.id);
    if (!existsSync(catDir)) {
        log(`  ${cat.id}: no directory, skipping`);
        categoryArticles.set(cat.id, []);
        continue;
    }

    const mdFiles = readdirSync(catDir).filter(f => f.endsWith('.md'));
    const arts = [];

    for (const mdFile of mdFiles) {
        const filePath = join(catDir, mdFile);
        const raw = readFileSync(filePath, 'utf-8');
        const { fields, body } = parseFrontmatter(raw);

        const slug = fields.id || basename(mdFile, '.md');
        const title = fields.title || slug;
        const description = fields.description || '';
        const hideInProd = fields.hideInProd === 'true' || fields.hideInProd === true;

        arts.push({ slug, title, description, hideInProd, filePath, body });

        if (!allArticles.has(slug)) {
            allArticles.set(slug, { slug, title, description, hideInProd, body, filePath });
        }

        if (!slugToCats.has(slug)) slugToCats.set(slug, []);
        slugToCats.get(slug).push(cat.id);
    }

    categoryArticles.set(cat.id, arts);
    log(`  ${cat.id}: ${arts.length} articles`);
}

log(`\nTotal unique articles: ${allArticles.size}`);

for (const [slug, cats] of slugToCats) {
    if (cats.length > 1) {
        log(`  MULTI-CATEGORY: ${slug} -> [${cats.join(', ')}]`);
    }
}

// ─── Step 3: Build image ownership map ───────────────────────────

log('\n--- Building image ownership ---');

const imagesDir = join(ROOT, 'images');

const imageDirs = new Map();
if (existsSync(imagesDir)) {
    for (const entry of readdirSync(imagesDir, { withFileTypes: true })) {
        if (entry.isDirectory() && entry.name !== 'categoryLogos') {
            imageDirs.set(entry.name.toLowerCase(), join(imagesDir, entry.name));
        }
    }
}

const IMG_REGEX = /(?:src=["']|!\[.*?\]\()(?:http:\/\/localhost:3000)?\/images\/([^/"')]+)\/([^"')]+)/g;

// Map from original-case dir name (from article content) to lowercase
// so we can find the actual dir on disk
const dirCaseMap = new Map(); // originalCase -> lowercase

const imageOwnership = new Map();
const articleImageRefs = new Map();

for (const [slug, art] of allArticles) {
    const refs = new Set();
    let match;
    IMG_REGEX.lastIndex = 0;

    while ((match = IMG_REGEX.exec(art.body)) !== null) {
        const [, dir, filename] = match;
        const dirLower = dir.toLowerCase();
        dirCaseMap.set(dir, dirLower);
        refs.add(JSON.stringify({ dir, filename }));

        // Use lowercase dir as key so it matches imageDirs keys
        const key = `${dirLower}/${filename}`;
        if (!imageOwnership.has(key)) imageOwnership.set(key, new Set());
        imageOwnership.get(key).add(slug);
    }

    articleImageRefs.set(slug, [...refs].map(r => JSON.parse(r)));
}

const imageFileOwner = new Map();

let sharedCount = 0;
for (const [key, slugs] of imageOwnership) {
    if (slugs.size > 1) {
        sharedCount++;
    }
    const firstSlug = [...slugs][0];
    imageFileOwner.set(key, firstSlug);
}

log(`Shared images: ${sharedCount}`);

// Find orphan images
const orphanImages = [];
for (const [dirName, dirPath] of imageDirs) {
    const files = findAllFiles(dirPath);
    for (const file of files) {
        const filename = relative(dirPath, file);
        const key = `${dirName}/${filename}`;
        if (!imageOwnership.has(key)) {
            orphanImages.push(key);
        }
    }
}

if (orphanImages.length) {
    log(`Orphan images: ${orphanImages.length}`);
    for (const o of orphanImages) warn(`Orphan: ${o}`);
}

// Build category lowercase mapping for orphan assignment
const catIdLower = new Map();
for (const cat of categories) {
    catIdLower.set(cat.id.toLowerCase(), cat.id);
}

// Assign orphan images to first article in their category
for (const orphan of orphanImages) {
    if (imageFileOwner.has(orphan)) continue;
    const dir = orphan.split('/')[0];
    const matchingCatId = catIdLower.get(dir);
    if (matchingCatId) {
        const catArts = categoryArticles.get(matchingCatId) || [];
        if (catArts.length > 0) {
            imageFileOwner.set(orphan, catArts[0].slug);
        }
    }
}

// ─── Step 4: Create new article directories ──────────────────────

log('\n--- Creating per-article directories ---');

const newArticlesDir = join(ROOT, 'articles_new');

if (!DRY_RUN) {
    mkdirSync(newArticlesDir, { recursive: true });
}

for (const [slug, art] of allArticles) {
    const artDir = join(newArticlesDir, slug);
    const artImgDir = join(artDir, 'images');

    log(`  Creating: articles/${slug}/`);

    if (!DRY_RUN) {
        mkdirSync(artDir, { recursive: true });
        mkdirSync(artImgDir, { recursive: true });
    }

    // Rewrite image URLs: /images/{dirName}/filename -> /images/{ownerSlug}/filename
    let newBody = art.body;
    newBody = newBody.replace(
        /((?:src=["']|!\[.*?\]\()(?:http:\/\/localhost:3000)?)\/images\/([^/"')]+)\/([^"')]+)/g,
        (fullMatch, prefix, dir, filename) => {
            const key = `${dir.toLowerCase()}/${filename}`;
            const owner = imageFileOwner.get(key) || slug;
            return `${prefix}/images/${owner}/${filename}`;
        }
    );

    // Build new frontmatter
    const fmLines = ['---'];
    fmLines.push(`description: ${yamlEscape(art.description)}`);
    if (art.hideInProd) {
        fmLines.push('hideInProd: true');
    }
    fmLines.push('---');

    const newContent = fmLines.join('\n') + newBody;

    if (!DRY_RUN) {
        writeFileSync(join(artDir, 'article.md'), newContent, 'utf-8');
    }
}

// ─── Step 5: Move images to per-article dirs ─────────────────────

log('\n--- Moving images to per-article directories ---');

let movedCount = 0;
let skippedCount = 0;

for (const [imageKey, ownerSlug] of imageFileOwner) {
    const [dir, ...filenameParts] = imageKey.split('/');
    const filename = filenameParts.join('/');

    const dirPath = imageDirs.get(dir);
    if (!dirPath) {
        warn(`Image dir not found for: ${imageKey}`);
        skippedCount++;
        continue;
    }

    const srcFile = join(dirPath, filename);
    if (!existsSync(srcFile)) {
        warn(`Image file not found: ${srcFile}`);
        skippedCount++;
        continue;
    }

    const destFile = join(newArticlesDir, ownerSlug, 'images', filename);

    if (!DRY_RUN) {
        mkdirSync(dirname(destFile), { recursive: true });
        copyFileSync(srcFile, destFile);
    }
    movedCount++;
}

log(`Moved ${movedCount} images, skipped ${skippedCount}`);

// ─── Step 6: Move categoryLogos -> categoryIcons ─────────────────

log('\n--- Moving category icons ---');

const oldLogosDir = join(ROOT, 'images', 'categoryLogos');
const newIconsDir = join(ROOT, 'categoryIcons');

if (existsSync(oldLogosDir)) {
    if (!DRY_RUN) {
        mkdirSync(newIconsDir, { recursive: true });
    }

    for (const file of readdirSync(oldLogosDir)) {
        const src = join(oldLogosDir, file);
        if (!statSync(src).isFile()) continue;
        const dest = join(newIconsDir, file);
        log(`  ${file}`);
        if (!DRY_RUN) {
            copyFileSync(src, dest);
        }
    }
}

// ─── Step 7: Generate category-article-mapping.yml ───────────────

log('\n--- Generating category-article-mapping.yml ---');

const mappingLines = ['categories:'];

for (const cat of categories) {
    const iconFile = cat.logo ? basename(cat.logo) : 'no-image.svg';

    mappingLines.push(`  - name: ${yamlEscape(cat.title)}`);
    mappingLines.push(`    slug: ${cat.id}`);
    mappingLines.push(`    icon: ${yamlEscape(iconFile)}`);
    mappingLines.push(`    description: ${yamlEscape(cat.description || '')}`);

    if (cat.hideInProd === true) {
        mappingLines.push('    hideInProd: true');
    }

    const arts = categoryArticles.get(cat.id) || [];
    mappingLines.push('    articles:');

    if (arts.length === 0) {
        mappingLines.push('      []');
    } else {
        for (const art of arts) {
            const shortTitle = generateShortTitle(art.title);
            mappingLines.push(`      - slug: ${art.slug}`);
            mappingLines.push(`        title: ${yamlEscape(art.title)}`);
            mappingLines.push(`        short_title: ${yamlEscape(shortTitle)}`);
        }
    }

    mappingLines.push('');
}

const mappingContent = mappingLines.join('\n') + '\n';

if (!DRY_RUN) {
    writeFileSync(join(ROOT, 'category-article-mapping.yml'), mappingContent, 'utf-8');
}

log('Generated category-article-mapping.yml');

// ─── Step 8: Transform dates.yaml ────────────────────────────────

log('\n--- Transforming dates.yaml ---');

const datesPath = join(ROOT, 'dates.yaml');
const datesRaw = readFileSync(datesPath, 'utf-8');

const newDatesLines = [];
const seenDateSlugs = new Set();

for (const line of datesRaw.split('\n')) {
    if (!line.trim()) continue;
    const match = line.match(/^"([^"]+)":\s*"([^"]+)"/);
    if (!match) continue;

    const [, oldKey, date] = match;
    const slug = oldKey.includes('/') ? oldKey.split('/').pop() : oldKey;

    if (seenDateSlugs.has(slug)) {
        log(`  Skipping duplicate: ${oldKey} (slug ${slug} already seen)`);
        continue;
    }
    seenDateSlugs.add(slug);
    newDatesLines.push(`"${slug}": "${date}"`);
}

const newDatesContent = newDatesLines.join('\n') + '\n';

if (!DRY_RUN) {
    writeFileSync(join(ROOT, 'dates_new.yaml'), newDatesContent, 'utf-8');
}

log(`Transformed dates.yaml: ${newDatesLines.length} entries`);

// ─── Step 9: Swap directories ────────────────────────────────────

if (!DRY_RUN) {
    log('\n--- Swapping directories ---');

    const oldArticlesBackup = join(ROOT, 'articles_old');
    renameSync(join(ROOT, 'articles'), oldArticlesBackup);
    log('  articles/ -> articles_old/');

    renameSync(newArticlesDir, join(ROOT, 'articles'));
    log('  articles_new/ -> articles/');

    const oldDatesBackup = join(ROOT, 'dates_old.yaml');
    renameSync(datesPath, oldDatesBackup);
    renameSync(join(ROOT, 'dates_new.yaml'), datesPath);
    log('  dates.yaml replaced');
}

// ─── Step 10: Report ─────────────────────────────────────────────

log('\n--- Root images (move to main app public/) ---');
const rootImages = ['activity.svg', 'analogHubMainLogo.svg', 'analogHubSmallLogo.svg'];
for (const img of rootImages) {
    if (existsSync(join(ROOT, 'images', img))) {
        log(`  ${img}`);
    }
}

log('\n=== Migration Report ===');
log(`Categories: ${categories.length}`);
log(`Unique articles: ${allArticles.size}`);
log(`Multi-category articles: ${[...slugToCats.values()].filter(c => c.length > 1).length}`);
log(`Images moved: ${movedCount}`);
log(`Orphan images: ${orphanImages.length}`);
log(`Shared images: ${sharedCount}`);

if (!DRY_RUN) {
    log('\nBackups: articles_old/, dates_old.yaml');
    log('Old images/ dir left intact — delete after verification');
    log('\nNext: run validators, then clean up old dirs');
}
