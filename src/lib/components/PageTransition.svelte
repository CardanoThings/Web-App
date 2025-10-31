<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// Key to trigger transitions. When `transitionKey` changes, the outgoing content will
	// fly out to the right and the incoming content will fly in from the right.
	export let transitionKey;

	// We'll measure the viewport width on the client and use that as the fly distance
	let widthPx = 300;
	let mounted = false;
	onMount(() => {
		mounted = true;
		if (typeof window !== 'undefined') widthPx = window.innerWidth || 300;
	});
</script>

<!--
Usage:
Wrap page content in <PageTransition key={$page.url}> ... </PageTransition>
When `key` changes the old child will fly out to the right and new child will fly in
from the right.
-->

{#if !mounted}
	<!-- Render directly on server/initial load to avoid hydration mismatch -->
	<div class="pt-page">
		<slot />
	</div>
{:else}
	{#key transitionKey}
		<div class="pt-page" in:fade={{ duration: 500 }} out:fade={{ duration: 0 }}>
			<slot />
		</div>
	{/key}
{/if}

<style>
	.pt-page {
		position: absolute;
		top: 128px;
		left: 0;
		width: 100%;
		height: calc(100% - 128px);
		will-change: transform, opacity;
	}
</style>
