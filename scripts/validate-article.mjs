/**
 * Validates frontmatter of changed .md article files.
 * Checks required fields, id uniqueness, and URL-safety.
 *
 * Usage: node scripts/validate-article.mjs [file1.md file2.md ...]
 *        If no args, validates all articles.
 */

import { readFileSync, readdirSync } from 'fs';
import { join, relative } from 'path';

const REQUIRED_FIELDS = ['id', 'title', 'description'];
const ID_REGEX = /^[a-zA-Z0-9_-]+$/;

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

const articlesDir = join(process.cwd(), 'articles');
const targetFiles = process.argv.length > 2
    ? process.argv.slice(2).filter(f => f.endsWith('.md'))
    : findMdFiles(articlesDir);

const errors = [];
const seenIds = new Map();

for (const file of targetFiles) {
    const rel = relative(process.cwd(), file);
    const content = readFileSync(file, 'utf-8');
    const fm = parseFrontmatter(content);

    if (!fm) {
        errors.push(`${rel}: missing YAML frontmatter`);
        continue;
    }

    for (const field of REQUIRED_FIELDS) {
        if (!fm[field]) {
            errors.push(`${rel}: missing required field '${field}'`);
        }
    }

    if (fm.id) {
        if (!ID_REGEX.test(fm.id)) {
            errors.push(`${rel}: id '${fm.id}' is not URL-safe (use [a-zA-Z0-9_-])`);
        }
        if (seenIds.has(fm.id)) {
            errors.push(`${rel}: duplicate id '${fm.id}' (also in ${seenIds.get(fm.id)})`);
        }
        seenIds.set(fm.id, rel);
    }
}

if (errors.length > 0) {
    console.error('Article validation failed:\n');
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
} else {
    console.log(`All ${targetFiles.length} articles validated successfully.`);
}
