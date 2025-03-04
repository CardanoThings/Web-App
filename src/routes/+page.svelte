<script>
	import Code from '$lib/Code.svelte';
</script>

{#snippet code()}
	<span>Hello World</span>
	<span>Hello World</span>
	<span>Hello World</span>
	<section>
		<h1>Heading</h1>
		<p>Paragraph</p>
	</section>
{/snippet}

<Code language="xml" {code}>
	<span>Hello World</span>
	<span>Hello World</span>
	<span>Hello World</span>
	<section>
		<h1>Heading</h1>
		<p>Paragraph</p>
	</section>
</Code>
