<script>
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import { links } from '$lib/data/links.js';
	import SearchBox from '$lib/components/SearchBox.svelte';
</script>

<header class="mx-auto mt-6 mb-12 flex w-full max-w-4xl justify-between">
	<div class="flex gap-1">
		<a href="/" class="pointer">
			<h1 class="flex font-medium text-white">
				Cardano
				<span class="font-thin">Things</span>
			</h1>
		</a>
		<span class=" relative -top-0.5 text-xs font-thin text-white">Beta</span>
	</div>

	<div class="flex items-center gap-6">
		<nav class="flex items-center gap-3 text-sm text-white">
			{#each links.filter((link) => link.headerNav) as link}
				<a
					href={link.link}
					rel="noopener noreferrer"
					class={$page.url.pathname === link.link ? 'nav-link active' : 'nav-link'}
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

<style>
	.nav-link {
		position: relative;
		padding-bottom: 0.25rem;
		font-weight: 300;
		transition: font-weight 0.2s;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 0;
		height: 2px;
		background-color: white;
		transition:
			width 0.3s ease,
			left 0.3s ease;
	}

	.nav-link:hover::after {
		width: 100%;
		left: 0;
	}

	.nav-link.active {
		font-weight: 500;
	}

	.nav-link.active::after {
		width: 100%;
		left: 0;
	}
</style>
