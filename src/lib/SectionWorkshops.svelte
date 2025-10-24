<script>
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { workshops } from "$lib/data/workshops.js";
</script>

<section id="workshops" class="mb-16">
  <div>
    <h1 class="mb-0">Workshops</h1>
    <p class="mt-2 mb-4">
      Step-by-step workshops to build your first Cardano IoT project with
      ESP32-based Microcontrollers
    </p>
  </div>
  {#each workshops as workshop}
    <Card.Root>
      <Card.Header>
        <Card.Title class="text-xl">{workshop.title}</Card.Title>
        <Card.Description>
          {workshop.description}
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <ol>
          {#each workshop.steps as step}
            <li>
              {step.title}
              <p>
                {step.description}
              </p>
            </li>
          {/each}
        </ol>
      </Card.Content>
      <Card.Footer>
        <Button href={workshop.link} size="sm">Start Workshop</Button>
      </Card.Footer>
    </Card.Root>
  {/each}
</section>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }

  ol {
    font-size: 0.875rem;
  }
  ol li {
    font-weight: 600;
  }

  ol li p {
    line-height: 1.4rem;
    margin-bottom: 0.25rem;
    color: var(--color-text-secondary);
    font-weight: 400;
  }
</style>
