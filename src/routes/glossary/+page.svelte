<script>
	import Input from '$lib/components/ui/input/Input.svelte';
	import { glossary } from '$lib/data/glossary.js';
	import { sort } from 'fast-sort';

	let searchTerm = $state('');
	let filteredEntries = $derived.by(() => {
		const entries = [...glossary];
		if (!searchTerm.trim()) return sort(entries).asc((e) => e.term.toLowerCase());
		const q = searchTerm.toLowerCase();
		return sort(
			entries.filter(
				(e) =>
					(e.term ?? '').toLowerCase().includes(q) || (e.definition ?? '').toLowerCase().includes(q)
			)
		).asc((e) => e.term.toLowerCase());
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
					<li class="mb-4">
						{entry.term}
						<p class="font-thin">{entry.definition}</p>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>
