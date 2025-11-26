<script>
	import { page } from '$app/state';
	import SectionBlocks from '$lib/SectionBlocks.svelte';
</script>

<SectionBlocks data={page.data} />
