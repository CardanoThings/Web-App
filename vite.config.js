import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import fs from 'fs';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,json}']
			},
			manifest: {
				name: 'CardanoThings Web App',
				short_name: 'CardanoThings',
				description: 'A comprehensive Cardano glossary and information hub',
				theme_color: '#1e40af',
				background_color: '#ffffff',
				display: 'standalone',
				orientation: 'portrait',
				scope: '/',
				start_url: '/',
				icons: [
					{
						src: 'icon-192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'icon-512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		})
	],
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
