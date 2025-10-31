<script>
	import { glossary } from '$lib/data/glossary.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { fade, fly } from 'svelte/transition';

	let { data, children } = $props();
	let open = $state(false);
	let termText = $state('');
	let termEntry = $state(null);

	// Create a function to process content that can be used in a Svelte action
	function glossaryAction(node) {
		const terms = glossary.map((entry) => entry.term);
		const regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');

		// Process text nodes only
		const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);

		const nodesToReplace = [];
		while (walker.nextNode()) {
			const textNode = walker.currentNode;
			if (!textNode.parentElement?.closest('script,style,pre')) {
				nodesToReplace.push(textNode);
			}
		}

		nodesToReplace.forEach((textNode) => {
			const fragment = document.createDocumentFragment();
			let lastIndex = 0;
			let match;

			while ((match = regex.exec(textNode.textContent)) !== null) {
				// Add text before the match
				if (match.index > lastIndex) {
					fragment.appendChild(
						document.createTextNode(textNode.textContent.slice(lastIndex, match.index))
					);
				}

				const termSpan = document.createElement('span');
				termSpan.className = 'glossary-term';
				termSpan.textContent = match[0];

				// Use event delegation instead of direct listeners
				fragment.appendChild(termSpan);
				lastIndex = regex.lastIndex;
			}

			// Add remaining text
			if (lastIndex < textNode.textContent.length) {
				fragment.appendChild(document.createTextNode(textNode.textContent.slice(lastIndex)));
			}

			textNode.parentNode.replaceChild(fragment, textNode);
		});

		// Use event delegation for better performance
		const handleClick = (event) => {
			const target = event.target;
			if (target.classList.contains('glossary-term')) {
				termText = target.textContent;
				termEntry = glossary.find((entry) => entry.term.toLowerCase() === termText.toLowerCase());
				open = true;
				event.stopPropagation();
			}
		};

		const handleKeydown = (event) => {
			if (event.key === 'Escape') {
				open = false;
			}
		};

		node.addEventListener('click', handleClick);
		window.addEventListener('keydown', handleKeydown);

		return {
			destroy() {
				node.removeEventListener('click', handleClick);
				window.removeEventListener('keydown', handleKeydown);
			}
		};
	}
</script>

<div use:glossaryAction>
	{@render children()}
</div>

{#if open && termEntry}
	<div
		class="fixed inset-0 z-40"
		role="button"
		tabindex="0"
		in:fly={{ y: 50, duration: 200 }}
		out:fly={{ y: 50, duration: 200 }}
		onclick={() => (open = false)}
		onkeydown={(e) => e.key === 'Escape' && (open = false)}
	>
		<Card.Root class="absolute right-8 bottom-8 z-50 w-80 transform gap-2">
			<Card.Header class="mb-0 pb-0">
				<Card.Title class="text-lg">
					<!-- <MessageCircleQuestion size={24} /> -->
					{termText}
				</Card.Title>
			</Card.Header>
			<Card.Content class="mt-0 pt-0">
				{termEntry?.definition}
			</Card.Content>
			<Card.Footer class="mt-2">
				<Button variant="outline" on:click={() => (open = false)}>Close</Button>
			</Card.Footer>
		</Card.Root>
	</div>
{/if}
