<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { X } from 'lucide-svelte';
	import SyntaxHighlighter from '$lib/components/SyntaxHighlighter.svelte';
	import TagBadge from '$lib/components/TagBadge.svelte';

	let { data } = $props();
	let prerequisitesOpen = $state(false);
	let usageOpen = $state(false);
</script>

<svelte:head>
	<title>{data.title} - CardanoThings</title>
	<meta name="description" content={data.description} />
</svelte:head>

<div class="w-max-4xl mx-auto w-full">
	<header class="mb-8 w-full md:w-1/2">
		<h1 class="mb-4 text-5xl font-semibold text-white">{data.title}</h1>
		{#if data.tags && data.tags.length > 0}
			<div class="mt-2 mb-3 flex flex-wrap gap-2">
				{#each data.tags as tag}
					<TagBadge {tag} size="small" />
				{/each}
			</div>
		{/if}
		<p class="text-lg leading-relaxed font-thin text-white">{data.description}</p>

		<div class="mt-4">
			<h2 class="mb-3 text-2xl font-semibold text-white">Overview</h2>
			<p class="leading-relaxed text-white">
				{data.overview || 'This block provides essential functionality for your ESP32 project.'}
			</p>

			{#if data.features && data.features.length > 0}
				<h3 class="mt-6 mb-2 text-xl font-semibold text-white">Features</h3>
				<ul class="my-2 list-disc pl-6 text-white/90">
					{#each data.features as feature}
						<li class="my-2">{feature}</li>
					{/each}
				</ul>
			{/if}

			{#if data.prerequisites}
				<div class="mt-6 rounded-lg border-2 border-purple-600 bg-purple-600/20 p-4">
					<h3 class="mb-2 text-xl font-semibold text-white">Before You Begin</h3>
					<p class="mb-3 text-sm text-white/80">
						Make sure you have the necessary setup and understanding before implementing this code
						block.
					</p>
					<Button variant="outline" onclick={() => (prerequisitesOpen = true)} class="gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<circle cx="12" cy="12" r="10" />
							<path d="M12 16v-4" />
							<path d="m12 8 .01 0" />
						</svg>
						Prerequisites
					</Button>
				</div>
			{/if}
		</div>
	</header>

	<main class="flex flex-col gap-6">
		{#if data.code}
			<Card.Root class="code-card">
				<Card.Header class="mb-0 flex flex-row items-center justify-between pb-0">
					<Card.Title class="text-lg">Code Example</Card.Title>
					<div class="flex gap-2">
						{#if data.usage}
							<Button
								onclick={() => (usageOpen = true)}
								variant="outline"
								size="sm"
								class="gap-2 text-xs"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<circle cx="12" cy="12" r="10" />
									<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
									<path d="M12 17h.01" />
								</svg>
								How to Use
							</Button>
						{/if}
						{#if data.githubLink}
							<Button
								href={data.githubLink}
								target="_blank"
								variant="outline"
								size="sm"
								class="gap-2 text-xs"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path
										d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
									/>
									<path d="M9 18c-4.51 2-5-2-7-2" />
								</svg>
								View on GitHub
							</Button>
						{/if}
					</div>
				</Card.Header>
				<Card.Content class="mt-0 pt-0">
					<SyntaxHighlighter
						language="cpp"
						code={data.code}
						defaultShowComments={true}
						defaultExpanded={true}
					/>
					{#if data.parameters && data.parameters.length > 0}
						<div class="mt-6">
							<h3 class="mb-3 text-lg font-semibold text-black">Parameters</h3>
							<div class="flex flex-col gap-2">
								{#each data.parameters as param}
									<div>
										<strong class="text-[1.1rem] text-purple-800">{param.name}</strong>
										<span class="ml-2 text-sm text-emerald-400">({param.type})</span>
										<p class="mt-1 text-black">{param.description}</p>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</Card.Content>
			</Card.Root>
		{/if}

		{#if data.notes}
			<Card.Root class="gap-2 border-white bg-transparent">
				<Card.Header class="mb-0 pb-0">
					<Card.Title class=" text-lg text-white">Notes</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="notes-content">
						{@html data.notes}
					</div>
				</Card.Content>
			</Card.Root>
		{/if}
	</main>
</div>

{#if data.prerequisites}
	<Drawer.Root bind:open={prerequisitesOpen} direction="right">
		<Drawer.Content class="h-screen w-full max-w-2xl overflow-x-hidden overflow-y-auto">
			<div class="relative p-6 pt-0">
				<Button
					variant="ghost"
					size="icon"
					class="absolute top-4 right-4 z-10"
					onclick={() => (prerequisitesOpen = false)}
				>
					<X class="h-4 w-4" />
				</Button>
				<div class="prerequisites-content mt-4">
					{@html data.prerequisites}
				</div>
			</div>
		</Drawer.Content>
	</Drawer.Root>
{/if}

{#if data.usage}
	<Dialog.Root bind:open={usageOpen}>
		<Dialog.Content class="max-h-[90vh] max-w-3xl overflow-y-auto">
			<Dialog.Header>
				<Dialog.Title>How to Use</Dialog.Title>
			</Dialog.Header>
			<div class="usage-dialog-content">
				{@html data.usage}
			</div>
		</Dialog.Content>
	</Dialog.Root>
{/if}

<style>
	.notes-content :global(p) {
		margin: 0.5rem 0;
		color: white;
	}

	.notes-content :global(ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin: 0.5rem 0;
		color: white;
	}

	.notes-content :global(li) {
		margin: 0.25rem 0;
		color: white;
	}

	.notes-content :global(strong) {
		color: white;
	}

	.prerequisites-content :global(h3) {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 1.5rem 0 0.75rem 0;
		color: black;
	}

	.prerequisites-content :global(h4) {
		font-size: 1.1rem;
		font-weight: 600;
		margin: 1rem 0 0.5rem 0;
		color: black;
	}

	.prerequisites-content :global(p) {
		margin: 0.5rem 0;
		line-height: 1.6;
	}

	.prerequisites-content :global(ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin: 0.5rem 0;
	}

	.prerequisites-content :global(li) {
		margin: 0.5rem 0;
		line-height: 1.6;
	}

	.prerequisites-content :global(strong) {
		color: #5b21b6;
	}

	.prerequisites-content :global(code) {
		background: rgba(255, 255, 255, 0.1);
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.9em;
		color: #34d399;
	}

	.prerequisites-content :global(a) {
		color: #5b21b6;
		text-decoration: underline;
	}

	.prerequisites-content :global(a:hover) {
		color: #6d28d9;
	}

	.usage-dialog-content :global(h3) {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 1.5rem 0 0.75rem 0;
		color: black;
	}

	.usage-dialog-content :global(h4) {
		font-size: 1.1rem;
		font-weight: 600;
		margin: 1rem 0 0.5rem 0;
		color: black;
	}

	.usage-dialog-content :global(p) {
		margin: 0.5rem 0;
		line-height: 1.6;
	}

	.usage-dialog-content :global(ol) {
		list-style-type: decimal;
		padding-left: 1.5rem;
		margin: 0.5rem 0;
	}

	.usage-dialog-content :global(ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin: 0.5rem 0;
	}

	.usage-dialog-content :global(li) {
		margin: 0.5rem 0;
		line-height: 1.6;
	}

	.usage-dialog-content :global(strong) {
		color: #5b21b6;
	}

	.usage-dialog-content :global(code) {
		background: rgba(255, 255, 255, 0.1);
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.9em;
		color: #34d399;
	}

	.usage-dialog-content :global(a) {
		color: #5b21b6;
		text-decoration: underline;
	}

	.usage-dialog-content :global(a:hover) {
		color: #6d28d9;
	}
</style>
