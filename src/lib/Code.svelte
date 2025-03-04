<script>
	import hljs from 'highlight.js';
	import 'highlight.js/styles/atom-one-dark.css'; // or another style
	import { onMount } from 'svelte';

	export let language = 'xml';
	export let code = '';
	let highlightedCode;
	let codeBlock;

	onMount(() => {
		// highlight the code
		highlightedCode = hljs.highlight(codeBlock.innerHTML, {
			language: language
		}).value;
	});
</script>

<pre class="hide" bind:this={codeBlock}>
		{@render code()}
</pre>

<pre class="hljs">
	<code>
		{@html highlightedCode}
	</code>
</pre>

<style>
	.hide {
		display: block;
	}

	code {
		white-space: pre;
	}
</style>
