<script>
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import { links } from '$lib/data/links.js';
	import SearchBox from '$lib/components/SearchBox.svelte';
</script>

<header
	class="z-index-[1000] m-auto mt-4 flex items-center justify-between px-4 py-4 sm:w-[95%] sm:px-4 md:w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%]"
>
	<div class="flex items-center gap-2">
		<a href="/" class="pointer">
			<h1 class="text-sm font-medium text-white">
				<div class="flex">
					Cardano
					<span class="font-thin">Things</span>
				</div>
			</h1>
		</a>
		<span class="font-thin text-white">|</span>
		<span class="font-thin text-white">Beta</span>
	</div>

	<div class="flex items-center gap-8">
		<nav class="flex items-center gap-4 text-sm text-white">
			{#each links.filter((link) => link.headerNav) as link}
				<a
					href={link.link}
					rel="noopener noreferrer"
					class={$page.url.pathname === link.link
						? 'border-b-2 border-white pb-1 font-medium'
						: 'border-b-2 border-transparent pb-1 font-thin transition-colors hover:border-white/50'}
				>
					{link.title}
				</a>
			{/each}
		</nav>

		<div class="flex flex-1 justify-end">
			<SearchBox />
		</div>
	</div>
</header>
