<script>
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { blocks } from "$lib/data/blocks.js";
  let searchTerm = $state("");
</script>

<div class="sectionWrapper">
  <section id="blocks" class="mb-16">
    <div class="text-white">
      <h1 class="text-4xl">Glossary</h1>
      <p class="mt-2 max-w-[90%] font-thin text-lg">
        A collection of terms and definitions related to all the tech used on
        CardanoThings.io.
      </p>
      <div class="mt-8 max-w-[420px]">
        {searchTerm}
        <Input
          id="whatever"
          bind:value={searchTerm}
          type="text"
          oninput={(e) => {
            console.log(searchTerm);
          }}
          placeholder="Search glossary..."
          class="mb-8 w-full"
        />
      </div>

      <Button on:click={() => console.log("Current searchTerm:", searchTerm)}>
        Log Search Term
      </Button>
    </div>
  </section>
</div>
