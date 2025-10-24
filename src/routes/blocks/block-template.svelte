<script>
  import * as Card from "$lib/components/ui/card/index.js";
  import SyntaxHighlighter from "$lib/SyntaxHighlighter.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>{data.title} - CardanoThings</title>
  <meta name="description" content={data.description} />
</svelte:head>

<div class="container">
  <header class="block-header">
    <h1>{data.title}</h1>
    <p class="description">{data.description}</p>
  </header>

  <main class="block-content">
    <Card.Root class="overview-card">
      <Card.Header>
        <Card.Title>Overview</Card.Title>
      </Card.Header>
      <Card.Content>
        <p>
          {data.overview ||
            "This block provides essential functionality for your ESP32 project."}
        </p>

        {#if data.features && data.features.length > 0}
          <h3>Features:</h3>
          <ul>
            {#each data.features as feature}
              <li>{feature}</li>
            {/each}
          </ul>
        {/if}
      </Card.Content>
    </Card.Root>

    {#if data.code}
      <Card.Root class="code-card">
        <Card.Header>
          <Card.Title>Code Example</Card.Title>
        </Card.Header>
        <Card.Content>
          <SyntaxHighlighter language="cpp" code={data.code} />
        </Card.Content>
      </Card.Root>
    {/if}

    {#if data.usage}
      <Card.Root class="usage-card">
        <Card.Header>
          <Card.Title>How to Use</Card.Title>
        </Card.Header>
        <Card.Content>
          <div class="usage-content">
            {@html data.usage}
          </div>
        </Card.Content>
      </Card.Root>
    {/if}

    {#if data.parameters && data.parameters.length > 0}
      <Card.Root class="parameters-card">
        <Card.Header>
          <Card.Title>Parameters</Card.Title>
        </Card.Header>
        <Card.Content>
          <div class="parameters-table">
            {#each data.parameters as param}
              <div class="parameter-row">
                <strong>{param.name}</strong>
                <span class="parameter-type">({param.type})</span>
                <p>{param.description}</p>
              </div>
            {/each}
          </div>
        </Card.Content>
      </Card.Root>
    {/if}

    {#if data.notes}
      <Card.Root class="notes-card">
        <Card.Header>
          <Card.Title>Notes</Card.Title>
        </Card.Header>
        <Card.Content>
          <div class="notes-content">
            {@html data.notes}
          </div>
        </Card.Content>
      </Card.Root>
    {/if}
  </main>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .block-header {
    margin-bottom: 2rem;
    text-align: center;
  }

  .block-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--color-text-primary);
  }

  .description {
    font-size: 1.2rem;
    color: var(--color-text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }

  .block-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .parameters-table {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .parameter-row {
    padding: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    background: var(--color-background-alt);
  }

  .parameter-type {
    color: var(--color-text-secondary);
    font-style: italic;
    margin-left: 0.5rem;
  }

  .parameter-row p {
    margin-top: 0.5rem;
    margin-bottom: 0;
    color: var(--color-text-secondary);
  }

  .usage-content :global(pre) {
    background: var(--color-background-alt);
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
  }

  .notes-content :global(p) {
    margin-bottom: 1rem;
  }

  .notes-content :global(p:last-child) {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .block-header h1 {
      font-size: 2rem;
    }

    .description {
      font-size: 1rem;
    }
  }
</style>
