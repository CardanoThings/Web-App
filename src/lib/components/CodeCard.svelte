<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import SyntaxHighlighter from '$lib/components/SyntaxHighlighter.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	let {
		title = 'Code Example',
		code,
		language = 'cpp',
		githubLink = null,
		howItWorksTitle = 'How it Works',
		howItWorksContent = null,
		footerText = null,
		defaultShowComments = false,
		defaultExpanded = false
	} = $props();

	let howItWorksOpen = $state(false);
</script>

<Card.Root>
	<Card.Header class="mb-0 flex flex-col gap-3 md:flex-row md:items-start md:justify-between pb-0">
		<Card.Title class="text-lg">{title}</Card.Title>
		<div class="flex gap-2">
			{#if howItWorksContent}
				<Button
					onclick={() => (howItWorksOpen = true)}
					variant="outline"
					size="sm"
					class="gap-2 text-xs"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="12" r="10" />
						<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
						<path d="M12 17h.01" />
					</svg>
					How it works
				</Button>
			{/if}
			{#if githubLink}
				<Button href={githubLink} target="_blank" variant="outline" size="sm" class="gap-2 text-xs">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path
							d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
						/>
						<path d="M9 18c-4.51 2-5-2-7-2" />
					</svg>
					View on GitHub
				</Button>
			{/if}
		</div>
	</Card.Header>
	<Card.Content class={footerText ? '' : 'pb-6'}>
		<SyntaxHighlighter {language} {code} {defaultShowComments} {defaultExpanded} />
	</Card.Content>
	{#if footerText}
		<Card.Footer>
			<p class="text-xs leading-relaxed">
				{footerText}
			</p>
		</Card.Footer>
	{/if}
</Card.Root>

{#if howItWorksContent}
	<Dialog.Root bind:open={howItWorksOpen}>
		<Dialog.Content class="max-h-[90vh] max-w-3xl overflow-y-auto">
			<Dialog.Header>
				<Dialog.Title>{howItWorksTitle}</Dialog.Title>
			</Dialog.Header>
			<div class="how-it-works-content">
				{@html howItWorksContent}
			</div>
		</Dialog.Content>
	</Dialog.Root>
{/if}

<style>
	.how-it-works-content :global(h3) {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 1.5rem 0 0.75rem 0;
		color: black;
	}

	.how-it-works-content :global(h4) {
		font-size: 1.1rem;
		font-weight: 600;
		margin: 1rem 0 0.5rem 0;
		color: black;
	}

	.how-it-works-content :global(p) {
		margin: 0.5rem 0;
		line-height: 1.6;
	}

	.how-it-works-content :global(ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin: 0.5rem 0;
	}

	.how-it-works-content :global(ol) {
		list-style-type: decimal;
		padding-left: 1.5rem;
		margin: 0.5rem 0;
	}

	.how-it-works-content :global(li) {
		margin: 0.75rem 0;
		line-height: 1.6;
	}

	.how-it-works-content :global(strong) {
		color: #5b21b6;
	}

	.how-it-works-content :global(code) {
		background: rgba(255, 255, 255, 0.1);
		padding: 0.2rem 0rem;
		border-radius: 0.25rem;
		font-size: 0.9em;
		color: #34d399;
	}

	.how-it-works-content :global(a) {
		color: #5b21b6;
		text-decoration: underline;
	}

	.how-it-works-content :global(a:hover) {
		color: #6d28d9;
	}
</style>
