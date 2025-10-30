<script>
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  // import { Toaster } from "$lib/components/ui/sonner/index.js";
  import VersionCheck from "$lib/base/VersionCheck.svelte";
  import PWAManager from "$lib/components/PWAManager.svelte";
  import Background from "$lib/base/Background.svelte";
  let { data, children } = $props();

  import Header from "$lib/base/Header.svelte";
  import Footer from "$lib/base/Footer.svelte";
</script>

<Background />
<ModeWatcher defaultMode={"dark"} />
<!-- <Toaster /> -->
<VersionCheck />
<PWAManager />

<div class="wrapper">
  <Header />
  <main>
    {@render children()}
  </main>
  <Footer {data} />
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
