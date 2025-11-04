<script>
	import { links } from '$lib/data/links.js';
	import { version } from '$app/environment';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
</script>

<footer class="mt-12 bg-white pt-8">
	<div class="mx-auto w-full max-w-4xl">
		<div class="mb-4 text-sm font-medium">
			<ul class="m-0 px-4 leading-7">
				{#each links as page}
					<li>
						<ChevronRight class="mr-0 inline h-5 w-5" strokeWidth="2.5" />
						<a href={page.link}>{page.title}</a>
					</li>
				{/each}
			</ul>
		</div>

		<section class="flex flex-row items-center justify-between gap-2 px-4 pb-4">
			<p class="text-xs">&copy; 2025 CardanoThings. All rights reserved.</p>
			<span class="text-xs text-zinc-400">Version: {version}</span>
		</section>
	</div>
</footer>
