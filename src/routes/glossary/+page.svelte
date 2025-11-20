<script>
	import { Input } from '$lib/components/ui/input/index.js';
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

	<div class="max-w-[420px]">
		<p class="mb-8 text-lg font-thin">
			A collection of terms and definitions related to all the tech used on CardanoThings.io
		</p>

		<Input
			bind:value={searchTerm}
			type="text"
			placeholder="Search glossary..."
			class="mb-8 w-full text-black"
		/>

		{#if filteredEntries.length === 0}
			<p class="font-thin">No entries found.</p>
		{:else}
			<ul>
				{#each filteredEntries as entry}
					<li class="mb-6">
						<h3 class="mb-2 text-xl font-medium">{entry.term}</h3>
						<p class="mb-2 font-thin">{entry.definition}</p>
						{#if entry.links && entry.links.length > 0}
							<div class="mt-2">
								<p class="mb-1 text-sm font-medium">Learn more:</p>
								<ul class="ml-4 list-disc space-y-1">
									{#each entry.links as link}
										<li>
											<a
												href={link.url}
												target={link.url.startsWith('http') ? '_blank' : undefined}
												rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
												class="link text-sm"
											>
												{link.title}
											</a>
										</li>
									{/each}
								</ul>
							</div>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>
