import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		outDir: 'server/build', // Ensure consistency with the SvelteKit adapter
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
	},
	resolve: {
		alias: {
			$stores: path.resolve('./src/stores'),
			$helper: path.resolve('./src/lib/helper'),
			$base: path.resolve('./src/lib/base'),
			$db: path.resolve('./src/lib/db'),
			$socket: path.resolve('./src/lib/socket')
		}
	}
});
