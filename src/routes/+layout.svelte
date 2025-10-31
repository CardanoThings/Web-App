<script>
	import '../app.css';
	import Header from '$lib/base/Header.svelte';
	import Footer from '$lib/base/Footer.svelte';
	import VersionCheck from '$lib/base/VersionCheck.svelte';
	import Background from '$lib/base/Background.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import GlossaryTracker from '$lib/components/GlossaryTracker.svelte';
	import { page } from '$app/state';
	let { children } = $props();
</script>

<Background />
<VersionCheck />
<!-- <PWAManager /> -->

<Header />
<PageTransition transitionKey={page.url.pathname}>
	<div class="relative flex h-full flex-col">
		<main class="flex-1">
			{@render children()}
		</main>
		<Footer />
	</div>
</PageTransition>

<!-- 
disable GlossaryTracker for now as it's causing hydration issues
<GlossaryTracker /> -->
