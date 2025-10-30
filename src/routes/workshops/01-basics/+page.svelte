<script>
  import WorkshopIntro from "$lib/base/WorkshopIntro.svelte";
  let { data } = $props();
</script>

<WorkshopIntro workshop={data.workshop} />
