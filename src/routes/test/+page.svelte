<script>
	import SyntaxHighlighter from '$lib/SyntaxHighlighter.svelte';
	import GlossaryParser from '$lib/GlossaryParser.svelte';
</script>

<GlossaryParser>
	<p>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis commodi provident odit
		Cardano accusantium velit quam mollitia vitae vero, expedita enim magnam aut? Sunt autem fuga
		possimus cum dolorum temporibus maxime.
	</p>
</GlossaryParser>
<br />

<SyntaxHighlighter language="c">
	<pre><code>
	const a = 1;
	const b = 2;
</code></pre>
</SyntaxHighlighter>

<br />

<SyntaxHighlighter language="xml">
	<pre><code>
	<section>
		<h1>Hello World</h1>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia repellat earum quisquam perspiciatis numquam odit eius dolores nulla rem provident ipsam ducimus quam, magni maxime facilis amet quos hic distinctio.</p>
	</section>		
</code></pre>
</SyntaxHighlighter>
