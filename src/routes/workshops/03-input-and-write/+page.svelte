<script>
	import WorkshopIntro from '$lib/WorkshopIntro.svelte';
	let { data } = $props();
</script>

<WorkshopIntro workshop={data.workshop} />
