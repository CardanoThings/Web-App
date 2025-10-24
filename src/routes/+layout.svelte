<script>
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import { Toaster } from "$lib/components/ui/sonner/index.js";
  import VersionCheck from "$lib/base/VersionCheck.svelte";
  import PWAManager from "$lib/components/PWAManager.svelte";
  let { data, children } = $props();

  import Header from "$lib/base/Header.svelte";
  import Footer from "$lib/base/Footer.svelte";
</script>

<ModeWatcher defaultMode={"dark"} />
<Toaster />
<VersionCheck />
<PWAManager />

<div class="wrapper">
  <Header />
  <main
    class="r m-auto mt-4 px-4 py-4 sm:w-[95%] sm:px-4 md:w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%]"
  >
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

  main {
    flex: 1;
  }
</style>
