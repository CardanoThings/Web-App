<script>
	import { onMount, tick } from 'svelte';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/atom-one-dark.css';
	export let language = 'javascript';
	let codeBlock;
	let rawHtml = '';
	let el = null;

	onMount(() => {
		extractSlotContent();
	});

	async function extractSlotContent() {
		await tick();
		const slot = el.querySelector('pre code');
		rawHtml = slot.innerHTML.replace('<!---->', '');
		// replace first and last line break
		rawHtml = rawHtml.replace(/^\n/, '').replace(/\n$/, '');
		// replace first tab
		rawHtml = rawHtml.replace(/^\t/, '');

		// replace first and last line if empty or tab
		rawHtml = rawHtml.replace(/^\n/, '').replace(/\n$/, '');
		rawHtml = rawHtml.replace(/^\t/, '');

		await tick();
		hljs.highlightElement(codeBlock, { language });
	}

	function copyCode() {
		navigator.clipboard.writeText(rawHtml);
	}
</script>

<!-- Hidden slot container to extract raw HTML -->
<div style="display: none;" bind:this={el}>
	<slot />
</div>

<pre class="hljs">
  <button onclick={copyCode}>Copy</button>
  <code bind:this={codeBlock} class={language}>
    {rawHtml}
  </code>
</pre>

<style>
	pre {
		position: relative;
	}
	pre code {
		padding: 0 !important;
		margin: 0 !important;
	}

	button {
		position: absolute;
		right: 0.25rem;
		top: 0.25rem;
	}
</style>
