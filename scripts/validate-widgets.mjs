#!/usr/bin/env node

/**
 * Lightweight CI validation for contributed widget YAML files.
 * No expr-eval dependency — validates structure and field presence only.
 *
 * Usage: node scripts/validate-widgets.mjs
 */

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WIDGETS_DIR = path.join(__dirname, '..', 'widgets');

const KNOWN_UNIT_GROUPS = new Set([
    'voltage', 'current', 'resistance', 'capacitance', 'inductance',
    'frequency', 'length', 'time', 'power', 'temperature', 'dimensionless',
]);

const ID_PATTERN = /^[a-zA-Z0-9_-]+$/;

let errors = 0;

function error(file, msg) {
    console.error(`  ERROR [${file}]: ${msg}`);
    errors++;
}

function main() {
    console.log('[validate-widgets] Checking widget YAML files...');

    if (!fs.existsSync(WIDGETS_DIR)) {
        console.log('[validate-widgets] No widgets/ directory found — nothing to validate.');
        process.exit(0);
    }

    const files = fs.readdirSync(WIDGETS_DIR).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));

    if (files.length === 0) {
        console.log('[validate-widgets] No widget files found — nothing to validate.');
        process.exit(0);
    }

    const seenIds = new Set();

    for (const file of files) {
        const filePath = path.join(WIDGETS_DIR, file);
        const raw = fs.readFileSync(filePath, 'utf-8');
        let config;

        try {
            config = yaml.load(raw);
        } catch (err) {
            error(file, `YAML parse error: ${err.message}`);
            continue;
        }

        if (!config || typeof config !== 'object') {
            error(file, 'Expected a YAML object');
            continue;
        }

        const expectedId = file.replace(/\.ya?ml$/, '');

        // Required fields
        if (!config.id) { error(file, 'Missing "id" field'); continue; }
        if (!config.title) { error(file, 'Missing "title" field'); continue; }
        if (!config.inputs) { error(file, 'Missing "inputs" field'); continue; }
        if (!config.outputs) { error(file, 'Missing "outputs" field'); continue; }

        // ID matches filename
        if (config.id !== expectedId) {
            error(file, `id "${config.id}" does not match filename "${expectedId}"`);
        }

        // ID format
        if (!ID_PATTERN.test(config.id)) {
            error(file, `id "${config.id}" contains invalid characters (allowed: a-zA-Z0-9_-)`);
        }

        // Uniqueness
        if (seenIds.has(config.id)) {
            error(file, `Duplicate widget id "${config.id}"`);
        }
        seenIds.add(config.id);

        // Validate inputs
        if (!Array.isArray(config.inputs)) {
            error(file, '"inputs" must be an array');
            continue;
        }

        const localIds = new Set();

        for (const inp of config.inputs) {
            if (!inp.id) { error(file, 'Input missing "id"'); continue; }
            if (!ID_PATTERN.test(inp.id)) { error(file, `Input id "${inp.id}" has invalid characters`); }
            if (localIds.has(inp.id)) { error(file, `Duplicate input id "${inp.id}"`); }
            localIds.add(inp.id);

            if (inp.type === 'number') {
                if (typeof inp.units === 'string' && !KNOWN_UNIT_GROUPS.has(inp.units)) {
                    error(file, `Input "${inp.id}" references unknown unit group "${inp.units}"`);
                }
                if (typeof inp.units !== 'string' && typeof inp.units !== 'object') {
                    error(file, `Input "${inp.id}" units must be a string (group name) or object (inline map)`);
                }
            }
        }

        // Validate outputs
        if (!Array.isArray(config.outputs)) {
            error(file, '"outputs" must be an array');
            continue;
        }

        for (const out of config.outputs) {
            if (!out.id) { error(file, 'Output missing "id"'); continue; }
            if (!ID_PATTERN.test(out.id)) { error(file, `Output id "${out.id}" has invalid characters`); }
            if (localIds.has(out.id)) { error(file, `Duplicate output id "${out.id}"`); }
            localIds.add(out.id);

            if (!out.formula) { error(file, `Output "${out.id}" missing "formula"`); }
        }

        if (errors === 0) {
            console.log(`  OK: ${file} (${config.title})`);
        }
    }

    console.log(`\n[validate-widgets] ${files.length} file(s) checked, ${errors} error(s).`);
    process.exit(errors > 0 ? 1 : 0);
}

main();
