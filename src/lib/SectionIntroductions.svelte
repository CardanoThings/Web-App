<script>
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  let { data } = $props();
</script>

<section id="introductions">
  <div>
    <h1>Introductions</h1>
    <p class="mt-2">
      Quick introductions to all the tech needed for projects on
      CardanoThings.io
    </p>
  </div>

  {#each data.introductions as item}
    <Card.Root>
      <Card.Header class="p-4 pb-0">
        <Card.Title class="text-lg">{item.title}</Card.Title>
        <Card.Description class="mb-0 p-0">
          {item.description}
        </Card.Description>
      </Card.Header>
      <Card.Content class="p-4">
        <p>{item.content}</p>
        <Button href={item.link} size="sm">Learn More</Button>
      </Card.Content>
    </Card.Root>
  {/each}
</section>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }
</style>
