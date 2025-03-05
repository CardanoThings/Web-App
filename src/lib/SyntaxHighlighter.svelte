<script>
	import { onMount, tick } from 'svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Copy } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { mode } from 'mode-watcher';
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/javascript';
	import xml from 'highlight.js/lib/languages/xml';
	import json from 'highlight.js/lib/languages/json';
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('json', json);
	import 'highlight.js/styles/tokyo-night-dark.min.css';
	export let language = 'javascript';
	let codeBlock;
	let rawHtml = '';
	let el = null;

	onMount(async () => {
		extractSlotContent();
	});

	async function extractSlotContent() {
		await tick();
		const slot = el.querySelector('pre code');
		rawHtml = slot.innerHTML.trim().replace(/^\n|\n$/g, '');
		// remove first and last line break

		await tick();
		hljs.highlightElement(codeBlock, { language });
	}

	function copyCode() {
		navigator.clipboard.writeText(rawHtml);
		toast.success('Code copied to clipboard');
	}
</script>

<!-- Hidden slot container to extract raw HTML -->
<div style="display: none;" bind:this={el}>
	<slot />
</div>

<section class={$$props.class + ' rounded-lg bg-slate-900'}>
	<div class="context">
		<Button class="text-xs" variant="ghost" size="icon" onclick={copyCode}>
			<Copy />
			<!-- {language} -->
		</Button>
	</div>

	<pre class="absolute text-sm">
<code bind:this={codeBlock} class={language}>
	{rawHtml}

</code></pre>
</section>

<style>
	section {
		position: relative;
	}

	.context {
		position: absolute;
		top: 4px;
		right: 4px;
		z-index: 1;
		opacity: 0.5;
	}

	pre {
		position: relative;
		margin: 0 !important;
		padding: 0 !important;
	}

	pre code {
		padding: 0 !important;
		margin: 0 !important;
		background: none;
	}
</style>
