<script>
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { glossary } from '$lib/data/glossary.js';
	import { sort } from 'fast-sort';

	const { data } = $props();
	let searchTerm = $state(data?.searchTerm || '');

	// Watch for URL param changes and update searchTerm
	$effect(() => {
		if (data?.searchTerm !== undefined) {
			searchTerm = data.searchTerm;
		}
	});

	// Create a derived store for filtered entries
	let filteredEntries = $derived.by(() => {
		const q = searchTerm.trim().toLowerCase();
		const entries = q
			? glossary.filter(
					(e) =>
						(e.term ?? '').toLowerCase().includes(q) ||
						(e.definition ?? '').toLowerCase().includes(q)
				)
			: glossary;
		return sort([...entries]).asc((e) => e.term.toLowerCase());
	});
</script>

<section class="mb-16 flex flex-col gap-4 text-white">
	<h1 class="max-w-[50%] text-6xl font-medium text-white">Glossary</h1>

	<div class="w-full">
		<p class="mb-8 text-lg font-thin lg:w-1/2">
			A collection of terms and definitions related to all the tech used on CardanoThings.io
		</p>

		<div class="sm:w-1/2 sm:pr-2">
			<Input
				bind:value={searchTerm}
				type="text"
				placeholder="Search glossary..."
				class="mb-8 w-full text-black"
			/>
		</div>

		{#if filteredEntries.length === 0}
			<p class="font-thin">No entries found.</p>
		{:else}
			<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
				{#each filteredEntries as entry}
					<Card.Root class="w-full bg-transparent text-white">
						<Card.Header>
							<Card.Title class="mt-0 pt-0 text-xl">{entry.term}</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="mb-4 leading-relaxed font-thin">{entry.definition}</p>
							{#if entry.links && entry.links.length > 0}
								<div class="mt-4">
									<p class="mb-2 text-sm font-medium">Learn more:</p>
									<ul class="ml-4 list-disc space-y-1">
										{#each entry.links as link}
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
						</Card.Content>
					</Card.Root>
				{/each}
			</div>
		{/if}
	</div>
</section>
