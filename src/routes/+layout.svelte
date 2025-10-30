<script>
  import "../app.css";
  // import { Toaster } from "$lib/components/ui/sonner/index.js";
  import VersionCheck from "$lib/base/VersionCheck.svelte";
  import PWAManager from "$lib/components/PWAManager.svelte";
  import Background from "$lib/base/Background.svelte";
  import PageTransition from "$lib/components/PageTransition.svelte";
  import { page } from "$app/stores";
  let { data, children } = $props();

  import Header from "$lib/base/Header.svelte";
  import Footer from "$lib/base/Footer.svelte";
</script>

<Background />
<!-- <Toaster /> -->
<VersionCheck />
<PWAManager />

<PageTransition transitionKey={$page.url.pathname}>
  <Header />
  <main class="overflow-x-hidden relative">
    {@render children()}
  </main>
  <Footer {data} />
</PageTransition>
