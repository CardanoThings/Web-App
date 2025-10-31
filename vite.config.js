import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	build: {
		resolve: {
			alias: {
				$stores: path.resolve('./src/stores'),
			}
		}
	}
});
