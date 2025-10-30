<script>
  let { data, children } = $props();
</script>

<aside>
  {@render children()}
</aside>

<style>
  aside {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    background: #111;
    border-left: 1px solid #222;
    padding: 1rem;
    overflow-y: auto;
    z-index: 1000;
  }
</style>
