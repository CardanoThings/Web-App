<script>
  import Input from "$lib/components/ui/input/Input.svelte";
  import { glossary } from "$lib/data/glossary.js";
  import { fade } from "svelte/transition";
  import sort from "fast-sort";

  let searchTerm = $state("");
  let filteredEntries = $derived.by(() => {
    console.log("Filtering glossary with searchTerm:", searchTerm);
    const entries = [...glossary];
    if (!searchTerm.trim())
      return sort(entries).asc((e) => e.term.toLowerCase());
    const q = searchTerm.toLowerCase();
    return sort(
      entries.filter(
        (e) =>
          (e.term ?? "").toLowerCase().includes(q) ||
          (e.definition ?? "").toLowerCase().includes(q)
      )
    ).asc((e) => e.term.toLowerCase());
  });
</script>

<section class="flex text-white flex-col mb-16 gap-4">
  <h1 class="text-white font-medium text-6xl max-w-[50%]">Glossary</h1>

  <div class="max-w-[420px]">
    <p class="text-lg font-thin mb-8">
      A collection of terms and definitions related to all the tech used on
      CardanoThings.io
    </p>

    <Input
      bind:value={searchTerm}
      oninput={() => {
        console.log("Filtering glossary with searchTerm:", searchTerm);
      }}
      type="text"
      placeholder="Search glossary..."
      class="mb-8 w-full"
    />

    <ul>
      {#each filteredEntries as entry}
        <li class="mb-4" out:fade={{ duration: 500 }}>
          {entry.term}
          <p class="font-thin">{entry.definition}</p>
        </li>
      {/each}
    </ul>
  </div>
</section>
