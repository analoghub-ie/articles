/**
 * Validates that all image references in markdown files exist in the repo.
 *
 * Usage: node scripts/validate-images.mjs [file1.md file2.md ...]
 *        If no args, validates all articles.
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, relative } from 'path';

function findMdFiles(dir) {
    const files = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory() && !entry.name.startsWith('.')) {
            files.push(...findMdFiles(full));
        } else if (entry.name.endsWith('.md')) {
            files.push(full);
        }
    }
    return files;
}

const root = process.cwd();
const articlesDir = join(root, 'articles');
const targetFiles = process.argv.length > 2
    ? process.argv.slice(2).filter(f => f.endsWith('.md'))
    : findMdFiles(articlesDir);

const errors = [];
const IMG_REGEX = /(?:src=["']|!\[.*?\]\()(\/?images\/[^"')]+)/g;

for (const file of targetFiles) {
    const rel = relative(root, file);
    const content = readFileSync(file, 'utf-8');
    let match;
    IMG_REGEX.lastIndex = 0;

    while ((match = IMG_REGEX.exec(content)) !== null) {
        let imgPath = match[1];
        if (imgPath.startsWith('/')) imgPath = imgPath.slice(1);
        const fullPath = join(root, imgPath);

        if (!existsSync(fullPath)) {
            errors.push(`${rel}: missing image '${imgPath}'`);
        }
    }
}

if (errors.length > 0) {
    console.error('Image validation failed:\n');
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
} else {
    console.log(`Image references validated across ${targetFiles.length} articles.`);
}
