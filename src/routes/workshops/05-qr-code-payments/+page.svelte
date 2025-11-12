<script>
	import WorkshopIntro from '$lib/components/WorkshopIntro.svelte';
	let { data } = $props();
</script>

<WorkshopIntro workshop={data.workshop} />
