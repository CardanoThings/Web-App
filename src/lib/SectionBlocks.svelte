<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { blocks } from '$lib/data/blocks.js';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	// Initialize selectedTags from URL parameter if present
	let selectedTags = $state([]);

	$effect(() => {
		const urlTags = page.url.searchParams.get('tags');
		if (urlTags) {
			selectedTags = urlTags.split(',').filter(Boolean);
		}
	});

	function toggleTag(tag) {
		let newTags;
		if (selectedTags.includes(tag)) {
			newTags = selectedTags.filter((t) => t !== tag);
		} else {
			newTags = [...selectedTags, tag];
		}
		selectedTags = newTags;

		// Update URL with selected tags
		const url = new URL(window.location.href);
		if (newTags.length > 0) {
			url.searchParams.set('tags', newTags.join(','));
		} else {
			url.searchParams.delete('tags');
		}
		goto(url.pathname + url.search, { replaceState: true, noScroll: true });
	}

	let filteredBlocks = $derived(
		selectedTags.length === 0
			? blocks
			: blocks.filter((block) => selectedTags.some((tag) => block.tags.includes(tag)))
	);

	// Get all unique tags from blocks
	let allTags = $derived([...new Set(blocks.flatMap((block) => block.tags))]);
</script>

<section id="blocks" class="mb-12">
	<div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
		<div class="text-white">
			<h1 class="text-4xl">Building Blocks</h1>
			<p class="mt-2 max-w-[90%] text-lg leading-relaxed font-thin">
				Easy to use building blocks for your ESP32 that will get you going with your own projects.
			</p>

			{#if selectedTags.length > 0}
				<div class="mt-4 flex flex-wrap gap-1">
					{#each selectedTags as tag}
						<Badge
							class="cursor-pointer border border-white bg-white text-xs text-black"
							onclick={() => toggleTag(tag)}
						>
							{tag}
						</Badge>
					{/each}
					<Badge
						variant="destructive"
						class="cursor-pointer text-xs"
						onclick={() => {
							selectedTags = [];
							const url = new URL(window.location.href);
							url.searchParams.delete('tags');
							goto(url.pathname, { replaceState: true, noScroll: true });
						}}
					>
						Clear
					</Badge>
				</div>
			{/if}
		</div>

		{#each filteredBlocks as item}
			<Card.Root class="bg-transparent text-white">
				<Card.Header>
					<Card.Title class="mt-0 pt-0 text-xl">{item.title}</Card.Title>
					<div class="mb-2 flex flex-wrap gap-1.5">
						{#each item.tags as tag}
							<Badge
								class="cursor-pointer border border-white bg-white text-xs text-black"
								onclick={() => toggleTag(tag)}
							>
								{tag}
							</Badge>
						{/each}
					</div>
					<Card.Description class="leading-6 text-slate-400">
						{item.description}
					</Card.Description>
				</Card.Header>
				<Card.Content class="flex-1"></Card.Content>
				<Card.Footer>
					<Button href={item.link} size="sm" variant="secondary" class="text-xs">Learn More</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</section>
