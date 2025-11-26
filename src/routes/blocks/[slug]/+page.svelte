<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { X, Info } from 'lucide-svelte';
	import CodeCard from '$lib/components/CodeCard.svelte';
	import TagBadge from '$lib/components/TagBadge.svelte';

	let { data } = $props();
	let prerequisitesOpen = $state(false);
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
	</header>

	<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
		<div>
			<h2 class="mb-3 text-2xl font-semibold text-white">Overview</h2>
			<p class="leading-relaxed text-white">
				{data.overview || 'This block provides essential functionality for your ESP32 project.'}
			</p>
		</div>

		{#if data.features && data.features.length > 0}
			<div>
				<h3 class="mb-2 text-xl font-semibold text-white">Features</h3>
				<ul class="my-2 list-disc pl-6 text-white/90">
					{#each data.features as feature}
						<li class="my-2">{feature}</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>

	{#if data.prerequisites}
		<aside class="mb-8 flex gap-3 rounded-md border border-white p-4 text-white sm:w-1/2">
			<Info size="48" strokeWidth={1.5} class="-mt-2" />
			<div class="flex flex-col gap-2">
				<h3 class="text-lg font-normal">Before You Begin</h3>
				<p class="text-xs leading-relaxed font-thin">
					Make sure you have the necessary setup and understanding before implementing this code
					block.
				</p>
				<Button
					variant="secondary"
					size="sm"
					onclick={() => (prerequisitesOpen = true)}
					class="mt-2 mb-1 w-fit text-xs"
				>
					Show Prerequisites
				</Button>
			</div>
		</aside>
	{/if}

	<main class="flex flex-col gap-6">
		{#if data.code}
			<CodeCard
				title="Code Example"
				code={data.code}
				language={data.language || 'cpp'}
				githubLink={data.githubLink}
				howItWorksTitle="How to Use"
				howItWorksContent={data.usage}
				defaultShowComments={true}
				defaultExpanded={true}
			/>
			{#if data.parameters && data.parameters.length > 0}
				<Card.Root>
					<Card.Content class="pt-6">
						<h3 class="mb-3 text-lg font-semibold text-black">Parameters</h3>
						<div class="flex flex-col gap-3">
							{#each data.parameters as param}
								<div>
									<strong class="text-purple-800">{param.name}</strong>
									<span class="text-sm text-emerald-400">({param.type})</span>
									<p class="mt-1 text-black">{param.description}</p>
								</div>
							{/each}
						</div>
					</Card.Content>
				</Card.Root>
			{/if}
		{/if}

		{#if data.notes || data.troubleshooting || data.nextSteps}
			<Accordion.Root class="accordion-custom w-full" value="notes">
				{#if data.notes}
					<Accordion.Item value="notes" class="border-dashed border-white">
						<Accordion.Trigger class="text-lg text-white hover:no-underline">
							Notes
						</Accordion.Trigger>
						<Accordion.Content>
							<div class="notes-content pt-2">
								{@html data.notes}
							</div>
						</Accordion.Content>
					</Accordion.Item>
				{/if}

				{#if data.troubleshooting}
					<Accordion.Item value="troubleshooting" class="border-dashed border-white">
						<Accordion.Trigger class="text-lg text-white hover:no-underline">
							Troubleshooting
						</Accordion.Trigger>
						<Accordion.Content>
							<div class="notes-content pt-2">
								{@html data.troubleshooting}
							</div>
						</Accordion.Content>
					</Accordion.Item>
				{/if}

				{#if data.nextSteps}
					<Accordion.Item value="nextSteps" class="border-dashed border-white">
						<Accordion.Trigger class="text-lg text-white hover:no-underline">
							Next Steps
						</Accordion.Trigger>
						<Accordion.Content>
							<div class="notes-content pt-2">
								{@html data.nextSteps}
							</div>
						</Accordion.Content>
					</Accordion.Item>
				{/if}
			</Accordion.Root>
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

	.prerequisites-content :global(ol) {
		list-style-type: decimal;
		padding-left: 1.5rem;
		margin: 0.5rem 0;
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

	/* Accordion custom styles */
	:global(.accordion-custom svg) {
		width: 1.5rem !important;
		height: 1.5rem !important;
		color: white !important;
		stroke: white !important;
	}
</style>
