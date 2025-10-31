<script>
	import { onMount, tick } from 'svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	// import { Copy } from "lucide-svelte";
	import { toast } from 'svelte-sonner';
	import { mode } from 'mode-watcher';
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/javascript';
	import xml from 'highlight.js/lib/languages/xml';
	import json from 'highlight.js/lib/languages/json';
	import cpp from 'highlight.js/lib/languages/cpp';
	import c from 'highlight.js/lib/languages/c';

	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('json', json);
	hljs.registerLanguage('cpp', cpp);
	hljs.registerLanguage('c', c);
	hljs.registerLanguage('arduino', cpp); // Use cpp for Arduino code

	export let language = 'javascript';
	export let code = '';
	let codeBlock;
	let highlightedCode = '';
	let container;

	onMount(async () => {
		await highlightCode();
		updateTheme();
	});

	$: if (code || language) {
		highlightCode();
	}

	$: if ($mode && container) {
		updateTheme();
	}

	function updateTheme() {
		if (!container) return;

		// Remove existing theme classes
		container.classList.remove('hljs-light', 'hljs-dark');

		// Add appropriate theme class
		if ($mode === 'dark') {
			container.classList.add('hljs-dark');
		} else {
			container.classList.add('hljs-light');
		}
	}

	async function highlightCode() {
		if (!code) return;

		await tick();
		try {
			// Preserve indentation by trimming only leading/trailing empty lines
			const cleanCode = code.replace(/^\n+|\n+$/g, '');
			const result = hljs.highlight(cleanCode, {
				language: language === 'arduino' ? 'cpp' : language
			});
			highlightedCode = result.value;
		} catch (error) {
			// Fallback to plain text if highlighting fails
			highlightedCode = code.replace(/^\n+|\n+$/g, '');
		}
	}

	function copyCode() {
		navigator.clipboard.writeText(code);
		toast.success('Code copied to clipboard');
	}
</script>

<!-- Fallback slot support -->
{#if !code}
	<div style="display: none;" bind:this={el}>
		<slot />
	</div>
{/if}

<section bind:this={container} class={$$props.class + ' code-container'}>
	<div class="context">
		<span class="language-badge">{language}</span>
		<Button class="copy-button" onclick={copyCode} title="Copy to Clipboard">
			<Copy />
		</Button>
	</div>

	<pre class="code-pre text-sm"><code bind:this={codeBlock} class={language}
			>{@html highlightedCode}</code
		></pre>
</section>

<style>
	.code-container {
		position: relative;
		border-radius: 0.5rem;
		overflow: hidden;
		border: 1px solid var(--border);
		background: var(--background);
	}

	.context {
		position: absolute;
		top: 8px;
		right: 8px;
		z-index: 10;
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.language-badge {
		display: inline-flex;
		height: 1.75rem;
		align-items: center;
		border-radius: 0.375rem;
		padding: 0 0.5rem;
		font-size: 0.625rem;
		font-weight: 500;
		text-transform: uppercase;
		background: rgba(0, 0, 0, 0.1);
		color: var(--muted-foreground);
		backdrop-filter: blur(4px);
	}

	.code-container.hljs-light .language-badge {
		background: rgba(64, 92, 121, 0.1);
		color: #405c79;
	}

	.code-container.hljs-dark .language-badge {
		background: rgba(203, 214, 226, 0.1);
		color: #cbd6e2;
	}

	:global(.copy-button) {
		height: 1.75rem !important;
		width: 1.75rem !important;
		font-size: 0.75rem !important;
		background: rgba(0, 0, 0, 0.1) !important;
		color: var(--muted-foreground) !important;
		backdrop-filter: blur(4px) !important;
		border: none !important;
	}

	:global(.copy-button:hover) {
		opacity: 0.8 !important;
	}

	.code-container.hljs-light :global(.copy-button) {
		background: rgba(64, 92, 121, 0.1) !important;
		color: #405c79 !important;
	}

	.code-container.hljs-dark :global(.copy-button) {
		background: rgba(203, 214, 226, 0.1) !important;
		color: #cbd6e2 !important;
	}

	.code-pre {
		position: relative;
		margin: 0 !important;
		padding: 1.5rem 1rem 1rem 1rem !important;
		overflow-x: auto;
		border-radius: 0.5rem;
		border: 1px solid var(--border);
	}

	.code-pre code {
		padding: 0 !important;
		margin: 0 !important;
		background: none !important;
		font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.875rem;
		line-height: 1.6;
		white-space: pre;
		word-wrap: normal;
		display: block;
		tab-size: 2;
	}

	/* Base16 Harmonic16 Light Theme Overrides */
	.code-container.hljs-light .code-pre {
		background: #f7f3f7 !important;
	}

	.code-container.hljs-light .code-pre code {
		color: #405c79 !important;
	}

	/* Base16 Harmonic16 Dark Theme Overrides */
	.code-container.hljs-dark .code-pre {
		background: #0b1c2c !important;
	}

	.code-container.hljs-dark .code-pre code {
		color: #cbd6e2 !important;
	}

	/* Ensure highlight.js themes apply properly */
	.code-pre code :global(.hljs) {
		background: transparent !important;
		padding: 0 !important;
	}

	/* Light theme - Base16 Harmonic16 Light colors */
	.code-container.hljs-light .code-pre code :global(.hljs-keyword),
	.code-container.hljs-light .code-pre code :global(.hljs-selector-tag),
	.code-container.hljs-light .code-pre code :global(.hljs-subst) {
		color: #bf8b56 !important;
	}

	.code-container.hljs-light .code-pre code :global(.hljs-string),
	.code-container.hljs-light .code-pre code :global(.hljs-attribute),
	.code-container.hljs-light .code-pre code :global(.hljs-symbol),
	.code-container.hljs-light .code-pre code :global(.hljs-bullet),
	.code-container.hljs-light .code-pre code :global(.hljs-addition) {
		color: #56bf8b !important;
	}

	.code-container.hljs-light .code-pre code :global(.hljs-title),
	.code-container.hljs-light .code-pre code :global(.hljs-section) {
		color: #8bbf56 !important;
	}

	.code-container.hljs-light .code-pre code :global(.hljs-type),
	.code-container.hljs-light .code-pre code :global(.hljs-class .hljs-title) {
		color: #bf5656 !important;
	}

	.code-container.hljs-light .code-pre code :global(.hljs-number),
	.code-container.hljs-light .code-pre code :global(.hljs-literal) {
		color: #bf8b56 !important;
	}

	.code-container.hljs-light .code-pre code :global(.hljs-comment),
	.code-container.hljs-light .code-pre code :global(.hljs-quote) {
		color: #8b9cbe !important;
		font-style: italic;
	}

	/* Dark theme - Base16 Harmonic16 Dark colors */
	.code-container.hljs-dark .code-pre code :global(.hljs-keyword),
	.code-container.hljs-dark .code-pre code :global(.hljs-selector-tag),
	.code-container.hljs-dark .code-pre code :global(.hljs-subst) {
		color: #ffb955 !important;
	}

	.code-container.hljs-dark .code-pre code :global(.hljs-string),
	.code-container.hljs-dark .code-pre code :global(.hljs-attribute),
	.code-container.hljs-dark .code-pre code :global(.hljs-symbol),
	.code-container.hljs-dark .code-pre code :global(.hljs-bullet),
	.code-container.hljs-dark .code-pre code :global(.hljs-addition) {
		color: #55ffaa !important;
	}

	.code-container.hljs-dark .code-pre code :global(.hljs-title),
	.code-container.hljs-dark .code-pre code :global(.hljs-section) {
		color: #aaff55 !important;
	}

	.code-container.hljs-dark .code-pre code :global(.hljs-type),
	.code-container.hljs-dark .code-pre code :global(.hljs-class .hljs-title) {
		color: #ff5555 !important;
	}

	.code-container.hljs-dark .code-pre code :global(.hljs-number),
	.code-container.hljs-dark .code-pre code :global(.hljs-literal) {
		color: #ffb955 !important;
	}

	.code-container.hljs-dark .code-pre code :global(.hljs-comment),
	.code-container.hljs-dark .code-pre code :global(.hljs-quote) {
		color: #aabcce !important;
		font-style: italic;
	}

	/* Scrollbar styling */
	.code-pre::-webkit-scrollbar {
		height: 8px;
	}

	.code-pre::-webkit-scrollbar-track {
		background: transparent;
	}

	.code-pre::-webkit-scrollbar-thumb {
		border-radius: 4px;
	}

	.code-container.hljs-light .code-pre::-webkit-scrollbar-thumb {
		background: rgba(64, 92, 121, 0.3);
	}

	.code-container.hljs-light .code-pre::-webkit-scrollbar-thumb:hover {
		background: rgba(64, 92, 121, 0.5);
	}

	.code-container.hljs-dark .code-pre::-webkit-scrollbar-thumb {
		background: rgba(203, 214, 226, 0.3);
	}

	.code-container.hljs-dark .code-pre::-webkit-scrollbar-thumb:hover {
		background: rgba(203, 214, 226, 0.5);
	}
</style>
