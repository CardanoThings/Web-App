<script>
  import * as Card from "$lib/components/ui/card/index.js";
  let { data } = $props();
  let workshops = $derived(data.workshops);
</script>

<section id="workshops" class="mb-8">
  <h1 class="mb-0">Workshops</h1>
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
    </Card.Root>
  {/each}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
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
