<script>
  import { page } from "$app/stores";
  import SectionBlocks from "$lib/SectionBlocks.svelte";
  const data = $page.data;
</script>

<SectionBlocks {data} />
