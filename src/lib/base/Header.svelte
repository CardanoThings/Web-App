<script>
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import { links } from '$lib/data/links.js';
	import SearchBox from '$lib/components/SearchBox.svelte';
	import { Menu } from 'lucide-svelte';
	import * as Drawer from '$lib/components/ui/drawer/index.js';

	let drawerOpen = $state(false);
</script>

<header class="mx-auto mt-6 mb-12 flex w-full max-w-4xl justify-between p-4">
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
		<!-- Desktop Navigation -->
		<nav class="hidden items-center gap-3 text-sm text-white md:flex">
			{#each links.filter((link) => link.headerNav) as link}
				<a
					href={link.link}
					rel="noopener noreferrer"
					class={$page.url.pathname.startsWith(link.link) && link.link !== '/'
						? 'nav-link active'
						: $page.url.pathname === link.link
							? 'nav-link active'
							: 'nav-link'}
				>
					{link.title}
				</a>
			{/each}
		</nav>

		<div class="flex flex-1 items-center justify-end gap-4">
			<SearchBox />
			<!-- Mobile Menu Button -->
			<Drawer.Root bind:open={drawerOpen} direction="right">
				<Drawer.Trigger class="md:hidden">
					<Menu size={24} class="text-white" />
				</Drawer.Trigger>
				<Drawer.Content class="px-4 py-6">
					<nav class="mt-4 flex flex-col gap-4">
						{#each links.filter((link) => link.headerNav) as link}
							<a
								href={link.link}
								rel="noopener noreferrer"
								class="cursor-pointer text-lg text-black transition-colors hover:text-black/80 {$page.url.pathname.startsWith(
									link.link
								) && link.link !== '/'
									? 'font-medium'
									: $page.url.pathname === link.link
										? 'font-medium'
										: ''}"
								onclick={() => (drawerOpen = false)}
							>
								{link.title}
							</a>
						{/each}
					</nav>
				</Drawer.Content>
			</Drawer.Root>
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
