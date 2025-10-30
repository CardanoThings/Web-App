<script>
  import { glossary } from "$lib/data/glossary.js";
  import { onMount } from "svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { fade, fly } from "svelte/transition";
  import { MessageCircleQuestion } from "lucide-svelte";

  // This component tracks glossary terms present on the page and adds popovers to them.
  let { data, children } = $props();
  let open = $state(false);
  let termText = $state("");
  let termEntry = $state(null);
  onMount(() => {
    // Find all glossary terms in the page content
    const contentElement = document.querySelector("main");
    if (!contentElement) return;

    const terms = glossary.map((entry) => entry.term);
    const regex = new RegExp(`\\b(${terms.join("|")})\\b`, "gi");

    // Replace terms with span elements that have popovers
    contentElement.innerHTML = contentElement.innerHTML.replace(
      regex,
      (matched) => {
        const termEntry = glossary.find(
          (entry) => entry.term.toLowerCase() === matched.toLowerCase()
        );
        if (termEntry) {
          return `<span class="glossary-term" title="${termEntry.definition}">${matched}</span>`;
        }
        return matched;
      }
    );

    window.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains("glossary-term")) {
        termText = target.textContent;
        termEntry = glossary.find(
          (entry) => entry.term.toLowerCase() === termText.toLowerCase()
        );

        open = true;
      }
    });

    // listen for escape key to close popover
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        open = false;
      }
    });

    // Optionally, you could initialize a tooltip library here for better popover handling
  });
</script>

{#if open && termEntry}
  <div
    class="fixed inset-0 z-40"
    role="button"
    tabindex="0"
    in:fly={{ y: 50, duration: 200 }}
    out:fly={{ y: 50, duration: 200 }}
    onclick={() => (open = false)}
    onkeydown={(e) => e.key === "Escape" && (open = false)}
  >
    <Card.Root class="absolute bottom-8 right-8 transform  w-80 z-50">
      <Card.Header>
        <Card.Title class="flex items-center gap-2 text-lg pb-0">
          <MessageCircleQuestion size={24} />
          {termText}
        </Card.Title>
      </Card.Header>
      <Card.Content class="mt-3 pt-0">
        {termEntry?.definition}
      </Card.Content>
      <Card.Footer class="">
        <Button variant="outline" class="" on:click={() => (open = false)}>
          Close
        </Button>
      </Card.Footer>
    </Card.Root>
  </div>
{/if}
