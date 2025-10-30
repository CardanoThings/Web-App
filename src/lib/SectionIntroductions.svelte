<script>
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { introductions } from "$lib/data/introductions.js";
</script>

<div class="sectionWrapper">
  <section id="introductions" class="mb-6">
    <div class="text-white">
      <h1 class="text-4xl">Introductions</h1>
      <p class="mt-2 max-w-[90%] font-thin text-lg">
        Quick introductions to all the tech needed for projects on
        CardanoThings.io
      </p>
    </div>

    {#each introductions as item}
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
</div>
