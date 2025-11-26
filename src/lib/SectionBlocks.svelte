<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { goto } from '$app/navigation';
	import TagBadge from '$lib/components/TagBadge.svelte';

	let { data } = $props();

	let blocks = $derived(data?.blocks || []);
	let allTags = $derived(data?.allTags || []);
	let selectedTag = $derived(data?.selectedTag || null);

	function filterByTag(tag) {
		goto(`/blocks?tags=${encodeURIComponent(tag)}`);
	}

	function clearFilter() {
		goto('/blocks');
	}
</script>

<section id="blocks" class="mb-12">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		<div class="text-white">
			<h1 class="text-4xl">Building Blocks</h1>
			<p class="mt-2 max-w-[90%] text-lg leading-relaxed font-thin">
				Easy to use building blocks for your ESP32 that will get you going with your own projects.
				Select a tag to filter the blocks by board, topic or IDE.
			</p>

			{#if selectedTag}
				<div class="mt-4">
					<h3 class="mb-2 text-sm font-semibold tracking-wide text-slate-300 uppercase">
						Active Filter
					</h3>
					<div class="flex flex-wrap gap-2">
						<TagBadge tag={selectedTag} onclick={() => filterByTag(selectedTag)} />
						<button class="clear-filter-badge" onclick={clearFilter}>
							<span class="clear-icon">✕</span>Clear Filter
						</button>
					</div>
				</div>
			{/if}
		</div>

		{#each blocks as item}
			<Card.Root class="flex flex-col bg-transparent text-white">
				<Card.Header>
					<Card.Title class="mt-0 pt-0 text-xl">{item.title}</Card.Title>
					{#if item.tags && item.tags.length > 0}
						<div class="mt-2 flex flex-wrap gap-1">
							{#each item.tags as tag}
								<TagBadge {tag} size="small" onclick={() => filterByTag(tag)} />
							{/each}
						</div>
					{/if}
					<Card.Description class="mt-2 leading-6 text-slate-400">
						{item.description}
					</Card.Description>
				</Card.Header>
				<Card.Content class="flex-1"></Card.Content>
				<Card.Footer>
					<Button href={item.link} size="sm" variant="secondary" class="text-xs">Learn More</Button>
				</Card.Footer>
			</Card.Root>
		{/each}

		{#if blocks.length === 0}
			<div class="col-span-full py-12 text-center">
				<p class="text-lg text-slate-400">No blocks found with the selected tag.</p>
				<Button variant="outline" class="mt-4" onclick={clearFilter}>Clear Filter</Button>
			</div>
		{/if}
	</div>
</section>

<style>
	.clear-filter-badge {
		padding: 0.375rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		border-radius: 0.375rem;
		cursor: pointer;
		background-color: white;
		border: 1px dashed white;
		color: black;
		display: flex;
		align-items: center;
	}

	.clear-icon {
		margin-right: 0.25rem;
	}
</style>
