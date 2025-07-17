<script>
	import { glossaryHover } from '$lib/glossaryHover.js';
	export let as = 'div'; // or 'section', 'article', etc.
</script>

<svelte:element this={as} use:glossaryHover={{ delay: 1500 }}>
	<slot />
</svelte:element>
