<script>
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { workshops } from "$lib/data/workshops.js";
</script>

<div class="sectionWrapper">
  <section id="workshops" class="mb-6">
    <div class="text-white">
      <h1 class="mb-0">Workshops</h1>
      <p class="mt-2 mb-4 max-w-[90%]">
        Step-by-step workshops to build your first Cardano IoT project with
        ESP32-based Microcontrollers
      </p>
    </div>
    {#each workshops as workshop}
      <Card.Root class="relative">
        <Card.Header>
          <Card.Title class="text-xl">{workshop.title}</Card.Title>
          <Card.Description>
            {workshop.description}
          </Card.Description>
        </Card.Header>
        <Card.Content class="pb-12">
          <!-- <ol>
            {#each workshop.steps as step}
              <li>
                {step.title}
                <p>
                  {step.description}
                </p>
              </li>
            {/each}
          </ol> -->
        </Card.Content>
        <Card.Footer class="absolute bottom-0">
          <Button href={workshop.link} size="sm">Start Workshop</Button>
        </Card.Footer>
      </Card.Root>
    {/each}
  </section>
</div>
