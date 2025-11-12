<script>
	import '../app.css';
	import Header from '$lib/base/Header.svelte';
	import Footer from '$lib/base/Footer.svelte';
	import VersionCheck from '$lib/base/VersionCheck.svelte';
	import Background from '$lib/base/Background.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import GlossaryTracker from '$lib/components/GlossaryTracker.svelte';
	import Banner from '$lib/base/Banner.svelte';
	import { page } from '$app/state';
	let { children } = $props();
</script>

<Background />
<VersionCheck />
<!-- <PWAManager /> -->

<Banner />
<Header />
<div class="scaler">
	<PageTransition transitionKey={page.url.pathname}>
		<main class="m-auto max-w-4xl px-4">
			{@render children()}
		</main>
	</PageTransition>
</div>
<Footer />

<!-- 
disable GlossaryTracker for now as it's causing hydration issues
<GlossaryTracker /> -->

<style>
	.scaler {
		min-height: calc(100vh - 416px);
	}
</style>
