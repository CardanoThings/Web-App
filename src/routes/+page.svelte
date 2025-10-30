<script>
  import ESP32 from "$lib/ESP32.svelte";
  import SectionWorkshops from "$lib/SectionWorkshops.svelte";
  import SectionIntroductions from "$lib/SectionIntroductions.svelte";
  import SectionBlocks from "$lib/SectionBlocks.svelte";
  let { data } = $props();
</script>

<!-- <section id="esp32" class="mb-8">
  <ESP32 modelUrl="/models/esp32c6.gltf" />
</section> -->

<SectionWorkshops />

<SectionIntroductions />

<SectionBlocks />
