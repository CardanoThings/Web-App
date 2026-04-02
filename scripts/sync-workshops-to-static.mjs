#!/usr/bin/env node
/**
 * Copies ./Workshops (clone of CardanoThings/Workshops) into static/cache so
 * LiveCodeCard can load /cache/CardanoThings/Workshops/main/... same-origin.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const workshopsDir = process.env.WORKSHOPS_DIR
	? path.resolve(process.env.WORKSHOPS_DIR)
	: path.join(root, 'Workshops');
const destRoot = path.join(root, 'static', 'cache', 'CardanoThings', 'Workshops', 'main');
const cacheCardanoThings = path.join(root, 'static', 'cache', 'CardanoThings');

function fail(msg) {
	console.error(msg);
	process.exit(1);
}

if (!fs.existsSync(workshopsDir)) {
	fail(
		`Missing Workshops directory:\n  ${workshopsDir}\n\n` +
			`Clone https://github.com/CardanoThings/Workshops into ./Workshops (repo root), or set WORKSHOPS_DIR.`
	);
}

const stat = fs.statSync(workshopsDir);
if (!stat.isDirectory()) {
	fail(`Not a directory: ${workshopsDir}`);
}

const entries = fs.readdirSync(workshopsDir);
if (entries.length === 0) {
	fail(`Workshops directory is empty: ${workshopsDir}`);
}

if (fs.existsSync(cacheCardanoThings)) {
	fs.rmSync(cacheCardanoThings, { recursive: true, force: true });
}

fs.mkdirSync(path.dirname(destRoot), { recursive: true });
fs.cpSync(workshopsDir, destRoot, {
	recursive: true,
	filter: (src) => !src.split(path.sep).includes('.git')
});
console.log(`Synced workshops:\n  ${workshopsDir}\n  -> ${destRoot}`);
