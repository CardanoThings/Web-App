<script>
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Badge from '$lib/components/ui/badge/index.js';
	import { troubleshooting } from '$lib/data/troubleshooting.js';
	import { sort } from 'fast-sort';

	const { data } = $props();
	let searchTerm = $state(data?.searchTerm || '');
	let selectedIssue = $state(null);
	let openDialog = $state(false);

	// Watch for URL param changes and update searchTerm
	$effect(() => {
		if (data?.searchTerm !== undefined) {
			searchTerm = data.searchTerm;
		}
	});

	// Get all unique categories
	let categories = $derived.by(() => {
		const cats = [...new Set(troubleshooting.map((t) => t.category))];
		return sort([...cats]).asc();
	});

	// Get all unique tags
	let allTags = $derived.by(() => {
		const tags = new Set();
		troubleshooting.forEach((t) => {
			if (t.tags) {
				t.tags.forEach((tag) => tags.add(tag));
			}
		});
		return sort([...tags]).asc();
	});

	// Filter entries based on search
	let filteredEntries = $derived.by(() => {
		const q = searchTerm.trim().toLowerCase();
		if (!q) return troubleshooting;

		return troubleshooting.filter(
			(e) =>
				(e.issue ?? '').toLowerCase().includes(q) ||
				(e.description ?? '').toLowerCase().includes(q) ||
				(e.category ?? '').toLowerCase().includes(q) ||
				(e.tags ?? []).some((tag) => tag.toLowerCase().includes(q))
		);
	});

	// Group filtered entries by category
	let groupedEntries = $derived.by(() => {
		const grouped = {};
		filteredEntries.forEach((entry) => {
			const category = entry.category || 'General';
			if (!grouped[category]) {
				grouped[category] = [];
			}
			grouped[category].push(entry);
		});

		// Sort entries within each category
		Object.keys(grouped).forEach((category) => {
			grouped[category] = sort([...grouped[category]]).asc((e) => e.issue.toLowerCase());
		});

		return grouped;
	});

	function openSolutionDialog(issue) {
		selectedIssue = issue;
		openDialog = true;
	}

	function closeDialog() {
		openDialog = false;
		selectedIssue = null;
	}
</script>

<section class="mb-16 flex flex-col gap-4 text-white">
	<h1 class="max-w-[50%] text-6xl font-medium text-white">Troubleshooting</h1>

	<div class="w-full">
		<p class="mb-8 text-lg font-thin lg:w-1/2">
			Common Arduino and ESP32 issues and how to fix them. Search for your problem or browse by
			category.
		</p>

		<div class="sm:w-1/2 sm:pr-2">
			<Input
				bind:value={searchTerm}
				type="text"
				placeholder="Search troubleshooting issues..."
				class="mb-8 w-full text-black"
			/>
		</div>

		{#if filteredEntries.length === 0}
			<p class="font-thin">No issues found. Try a different search term.</p>
		{:else}
			<div class="space-y-8">
				{#each categories as category}
					{#if groupedEntries[category] && groupedEntries[category].length > 0}
						<div>
							<h2 class="mb-4 text-2xl font-medium">{category}</h2>
							<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
								{#each groupedEntries[category] as entry}
									<Card.Root class="flex h-full w-full flex-col bg-transparent text-white">
										<Card.Header>
											<Card.Title class="mt-0 pt-0 text-xl">{entry.issue}</Card.Title>
										</Card.Header>
										<Card.Content class="flex flex-1 flex-col">
											<div class="flex flex-1 flex-col space-y-4">
												<div>
													<p class="leading-relaxed font-thin">{entry.description}</p>
												</div>

												{#if entry.tags && entry.tags.length > 0}
													<div class="flex flex-wrap gap-2">
														{#each entry.tags as tag}
															<Badge.Root variant="outline" class="text-xs">
																{tag}
															</Badge.Root>
														{/each}
													</div>
												{/if}

												<button
													onclick={() => openSolutionDialog(entry)}
													class="mt-auto rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100"
												>
													View Solution
												</button>
											</div>
										</Card.Content>
									</Card.Root>
								{/each}
							</div>
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</section>

{#if selectedIssue}
	<Dialog.Root bind:open={openDialog}>
		<Dialog.Content class="max-h-[90vh] max-w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-2xl">
			<Dialog.Header class="text-left">
				<Dialog.Title class="text-left text-2xl text-black">{selectedIssue.issue}</Dialog.Title>
			</Dialog.Header>

			<div class="mt-4 space-y-6 text-left text-sm text-black">
				<div>
					<p class="mb-2 text-sm font-medium">Description:</p>
					<p class="leading-relaxed font-thin">{selectedIssue.description}</p>
				</div>

				<div>
					<p class="mb-2 text-sm font-medium">Cause:</p>
					<p class="leading-relaxed font-thin">{selectedIssue.cause}</p>
				</div>

				<div>
					<p class="mb-2 text-sm font-medium">Solution:</p>
					<p class="leading-relaxed font-thin">{selectedIssue.solution}</p>
				</div>

				{#if selectedIssue.prevention}
					<div>
						<p class="mb-2 text-sm font-medium">Prevention:</p>
						<p class="leading-relaxed font-thin">{selectedIssue.prevention}</p>
					</div>
				{/if}

				{#if selectedIssue.tags && selectedIssue.tags.length > 0}
					<div>
						<p class="mb-2 text-sm font-medium">Tags:</p>
						<div class="flex flex-wrap gap-2">
							{#each selectedIssue.tags as tag}
								<Badge.Root variant="outline" class="text-xs">
									{tag}
								</Badge.Root>
							{/each}
						</div>
					</div>
				{/if}

				{#if selectedIssue.links && selectedIssue.links.length > 0}
					<div>
						<p class="mb-2 text-sm font-medium">Learn more:</p>
						<ul class="ml-4 list-disc space-y-1">
							{#each selectedIssue.links as link}
								<li>
									<a
										href={link.url}
										target={link.url.startsWith('http') ? '_blank' : undefined}
										rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
										class="link text-sm hover:underline"
									>
										{link.title}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		</Dialog.Content>
	</Dialog.Root>
{/if}
