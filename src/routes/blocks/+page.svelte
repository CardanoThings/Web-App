<script>
  import { page } from "$app/state";
  import SectionBlocks from "$lib/SectionBlocks.svelte";
  const data = page.data;
</script>

<SectionBlocks {data} />
