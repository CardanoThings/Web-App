<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();

	import Header from '$lib/base/Header.svelte';
	import Footer from '$lib/base/Footer.svelte';
</script>

<ModeWatcher defaultMode={'dark'} />

<Header />
<main>
	{@render children()}
</main>
<Footer />
