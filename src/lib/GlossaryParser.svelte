<script>
	// !! open state not working
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { onMount } from 'svelte';
	import { glossary } from '$stores/glossary.js';
	let { children } = $props();
	let open = $state(false);
	let section;
	let content = $state(undefined);

	onMount(() => {
		section.querySelectorAll('p').forEach((p) => {
			let words = p.innerText.split(' ');
			let newWords = words.map((word) => {
				let glossaryWord = glossary.find((glossaryWord) => glossaryWord.word === word);
				if (glossaryWord) {
					return `<span class="glossary-word" data-popover="${glossaryWord.id}">${word}</span>`;
				}
				return word;
			});
			p.innerHTML = newWords.join(' ');
		});

		// listen for click events on glossary words
		section.addEventListener('click', (event) => {
			if (event.target.classList.contains('glossary-word')) {
				content = event.target.getAttribute('data-popover');
				console.log(content);
				open = true;
			}
		});
	});
</script>

<section bind:this={section}>
	{@render children()}
</section>

<Popover.Root bind:open>
	<Popover.Content>{content}</Popover.Content>
</Popover.Root>

<style>
	:global .glossary-word {
		cursor: pointer;
		color: inherit;
		border-bottom: 2px dashed white;
	}
</style>
