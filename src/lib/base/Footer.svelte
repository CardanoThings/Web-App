<script>
	import { links } from '$lib/data/links.js';
	import { version } from '$app/environment';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
</script>

<footer class="mt-12 bg-white pt-8">
	<div class="mx-auto w-full max-w-4xl p-4 pt-2">
		<div class="mb-8 text-sm font-medium">
			<ul class="m-0 list-inside list-none leading-4 font-medium">
				{#each links as page}
					<li>
						<ChevronRight class="mr-0 inline h-5 w-5" strokeWidth="2.5" />
						<a href={page.link}>{page.title}</a>
					</li>
				{/each}
			</ul>
		</div>

		<div class="mb-6 px-5">
			<p class="text-xs leading-relaxed text-slate-500">
				<strong>Disclaimer:</strong> All examples, tutorials, and code provided on this website are for
				educational purposes only. Use them at your own risk. CardanoThings will not be held responsible
				for any damages to hardware, software, or persons that may occur from using these materials.
				Always take appropriate safety precautions when working with electronic components and hardware
				and make sure to read and understand the documentation of the hardware you are using.
			</p>
		</div>

		<section class="flex flex-row items-center justify-between gap-2 px-5 pb-4">
			<p class="text-xs">&copy; 2025 CardanoThings. All rights reserved.</p>
			<span class="text-xs text-zinc-400">Version: {version}</span>
		</section>
	</div>
</footer>
