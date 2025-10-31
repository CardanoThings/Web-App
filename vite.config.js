import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	build: {
		resolve: {
			alias: {
				$stores: path.resolve('./src/stores'),
			}
		},
		rollupOptions: {
			plugins: [
				{
					name: 'write-version',
					buildStart() {
						const version = JSON.parse(fs.readFileSync('./package.json')).version;
						const versionFile = {
							version: version,
							timestamp: new Date().toISOString()
						};
						fs.writeFileSync('./static/version.json', JSON.stringify(versionFile, null, 2));
						console.log(`Generated version.json with version: ${version}`);
					}
				}
			]
		}
	}
});
