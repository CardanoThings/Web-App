<script>
  import { page } from "$app/stores";
</script>

<div class="error-container">
  <div>
    <h1>Something went wrong</h1>
    <p>Status: {$page.status}</p>
    <p>Error: {$page.error?.message}</p>
  </div>
</div>

<style>
  .error-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 2rem;
    display: grid;
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    place-items: center;
  }

  h1 {
    color: white;
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
    color: white;
  }
</style>
