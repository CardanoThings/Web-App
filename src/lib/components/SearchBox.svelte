<script>
	import * as Command from '$lib/components/ui/command';
	import { goto } from '$app/navigation';
	import { blocks } from '$lib/data/blocks.js';
	import { workshops } from '$lib/data/workshops.js';
	import { introductions } from '$lib/data/introductions.js';
	import { glossary } from '$lib/data/glossary.js';
	import { cn } from '$lib/utils.js';
	import { Search } from 'lucide-svelte';

	let searchQuery = $state('');
	let isOpen = $state(false);

	// Create a static list of searchable items
	const searchItems = [
		...blocks.map((item) => ({
			type: 'Block',
			...item
		})),
		...introductions.map((item) => ({
			type: 'Introduction',
			...item
		})),
		...glossary.map((item) => ({
			type: 'Glossary',
			title: item.term,
			description: item.definition,
			link: `/glossary?term=${encodeURIComponent(item.term)}`
		}))
	];

	// Create a reactive filtered items list
	let searchResults = $derived.by(() => {
		const query = searchQuery?.trim().toLowerCase();

		if (!query) return [];

		const matches = searchItems.filter((item) => {
			const title = (item.title || '').toLowerCase();
			const desc = (item.description || '').toLowerCase();
			return title.includes(query) || desc.includes(query);
		});

		// Sort to show Glossary and Introductions first
		const sorted = matches.sort((a, b) => {
			const priorityOrder = { Glossary: 0, Introduction: 1, Workshop: 2, Block: 3 };
			return (priorityOrder[a.type] || 4) - (priorityOrder[b.type] || 4);
		});

		return sorted.slice(0, 10);
	});

	function handleSelect(item) {
		goto(item.link);
		isOpen = false;
		searchQuery = '';
	}

	// Show/hide based on input focus
	function handleFocus() {
		isOpen = true;
	}

	// Handle blur to close dropdown
	function handleBlur() {
		// Small delay to allow click events to fire
		setTimeout(() => {
			isOpen = false;
		}, 200);
	}
</script>

<div class="relative w-full max-w-sm">
	<div class="relative">
		<div class="relative">
			<Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
			<input
				type="text"
				placeholder="Search content..."
				bind:value={searchQuery}
				onfocus={handleFocus}
				onblur={handleBlur}
				class="h-9 w-full rounded-md border border-gray-200 bg-white pr-3 pl-9 text-sm text-black placeholder:text-gray-500 focus:ring-1 focus:ring-black/50 focus:outline-none"
			/>
		</div>

		{#if isOpen && searchQuery?.trim()}
			<div class="absolute z-50 mt-2 w-full">
				<div
					class="max-h-[300px] overflow-y-auto rounded-md border border-white/20 bg-background shadow-lg"
				>
					{#if searchResults.length > 0}
						{#each searchResults as item}
							<button
								onclick={() => handleSelect(item)}
								class="flex w-full flex-col gap-1 p-2 text-left hover:bg-accent"
							>
								<div class="flex items-center justify-between">
									<span class="text-sm font-medium text-foreground">{item.title}</span>
									<span class="text-xs text-muted-foreground">{item.type}</span>
								</div>
								<p class="truncate text-xs text-muted-foreground">
									{item.description}
								</p>
							</button>
						{/each}
					{:else}
						<div class="p-2 text-sm text-muted-foreground">
							No results found for "{searchQuery}"
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>
