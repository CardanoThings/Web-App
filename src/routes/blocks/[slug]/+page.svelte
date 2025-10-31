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
  }

  .block-header h1 {
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: white;
  }

  .description {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .block-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1rem 0 0.5rem 0;
  }

  ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 0.5rem 0;
  }

  li {
    margin: 0.25rem 0;
  }

  .usage-content :global(ol) {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin: 0.5rem 0;
  }

  .usage-content :global(li) {
    margin: 0.5rem 0;
  }

  .parameters-table {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .parameter-row {
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
  }

  .parameter-row strong {
    color: #60a5fa;
    font-size: 1.1rem;
  }

  .parameter-type {
    color: #34d399;
    margin-left: 0.5rem;
    font-size: 0.9rem;
  }

  .parameter-row p {
    margin-top: 0.5rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .notes-content :global(p) {
    margin: 0.5rem 0;
  }

  .notes-content :global(ul) {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 0.5rem 0;
  }

  .notes-content :global(li) {
    margin: 0.25rem 0;
  }

  .notes-content :global(strong) {
    color: #60a5fa;
  }
</style>
