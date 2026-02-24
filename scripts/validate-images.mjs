#!/usr/bin/env node
/**
 * Validates image references in article.md files for the per-article structure.
 *
 * Checks:
 *   1. Extract all image references from each article.md
 *   2. For /images/{slug}/filename — verify articles/{slug}/images/filename exists
 *   3. For /images/categoryIcons/filename — verify categoryIcons/filename exists
 *   4. Warn about unused images in articles/{slug}/images/ directories
 *   5. Reject old-style paths (/images/{category}/ where category is not a valid slug)
 *
 * Usage: node scripts/validate-images.mjs [file1 file2 ...]
 *        If no args, validates all articles.
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, relative } from 'path';

const ROOT = process.cwd();
const ARTICLES_DIR = join(ROOT, 'articles');

const errors = [];
const warnings = [];

function findArticleFiles(dir) {
    const files = [];
    if (!existsSync(dir)) return files;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            const articlePath = join(dir, entry.name, 'article.md');
            if (existsSync(articlePath)) {
                files.push(articlePath);
            }
        }
    }
    return files;
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

// Collect all valid article slugs (directories in articles/)
const validSlugs = new Set();
if (existsSync(ARTICLES_DIR)) {
    for (const entry of readdirSync(ARTICLES_DIR, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            validSlugs.add(entry.name);
        }
    }
}

// Determine which files to validate
const targetFiles = process.argv.length > 2
    ? process.argv.slice(2).filter(f => existsSync(f))
    : findArticleFiles(ARTICLES_DIR);

const IMG_REGEX = /(?:src=["']|!\[.*?\]\()(?:http:\/\/localhost:3000)?\/images\/([^/"')]+)\/([^"')]+)/g;

// Track which images in each slug's images/ dir are referenced
const referencedImages = new Map();

for (const file of targetFiles) {
    const rel = relative(ROOT, file);
    const content = readFileSync(file, 'utf-8');
    let match;
    IMG_REGEX.lastIndex = 0;

    while ((match = IMG_REGEX.exec(content)) !== null) {
        const [, dirOrSlug, filename] = match;

        // categoryIcons reference
        if (dirOrSlug === 'categoryIcons') {
            const iconPath = join(ROOT, 'categoryIcons', filename);
            if (!existsSync(iconPath)) {
                errors.push(`${rel}: missing categoryIcon '${filename}'`);
            }
            continue;
        }

        // Reject if dirOrSlug is not a valid article slug
        if (!validSlugs.has(dirOrSlug)) {
            errors.push(`${rel}: image path '/images/${dirOrSlug}/${filename}' uses invalid slug (not a known article directory)`);
            continue;
        }

        // Verify the image file exists
        const imgPath = join(ARTICLES_DIR, dirOrSlug, 'images', filename);
        if (!existsSync(imgPath)) {
            errors.push(`${rel}: missing image 'articles/${dirOrSlug}/images/${filename}'`);
        }

        // Track reference
        if (!referencedImages.has(dirOrSlug)) referencedImages.set(dirOrSlug, new Set());
        referencedImages.get(dirOrSlug).add(filename);
    }
}

// Warn about unused images
for (const slug of validSlugs) {
    const imgDir = join(ARTICLES_DIR, slug, 'images');
    if (!existsSync(imgDir)) continue;

    const filesOnDisk = findAllFiles(imgDir).map(f => relative(imgDir, f));
    const referenced = referencedImages.get(slug) || new Set();

    for (const file of filesOnDisk) {
        if (!referenced.has(file)) {
            warnings.push(`articles/${slug}/images/${file}: unused image`);
        }
    }
}

// Results
console.log(`Validated image references across ${targetFiles.length} articles`);

if (warnings.length > 0) {
    console.warn(`\nWarnings (${warnings.length}):`);
    for (const w of warnings) console.warn(`  ${w}`);
}

if (errors.length > 0) {
    console.error(`\nImage validation FAILED (${errors.length} errors):`);
    for (const e of errors) console.error(`  ${e}`);
    process.exit(1);
} else {
    console.log('\nImage validation PASSED');
}
