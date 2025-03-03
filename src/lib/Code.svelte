<script>
	import hljs from 'highlight.js';
	import 'highlight.js/styles/atom-one-dark.css'; // or another style
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';

	export let language = 'xml';
	let highlightedCode;
	let codeBlock;
	onMount(() => {
		// clean up the code block by removing leading and trailing white spaces
		codeBlock.innerHTML = codeBlock.innerHTML.replace(/^\s+|\s+$/g, '');

		highlightedCode = hljs.highlight(codeBlock.innerHTML, {
			language: 'xml'
		}).value;
	});
</script>

<pre class="hide">
	<code bind:this={codeBlock}>
		<slot></slot>
	</code>
</pre>

<pre class="hljs">
	<code class={language}>
	{@html highlightedCode}
</code>
</pre>

<style>
	.hide {
		display: none;
	}
</style>
