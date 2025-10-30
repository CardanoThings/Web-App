<script>
  import { Button } from "$lib/components/ui/button/index.js";
  import { Github } from "lucide-svelte";
  import DarkMode from "$lib/base/DarkMode.svelte";
  import InstallButton from "$lib/components/InstallButton.svelte";
</script>

<header
  class="m-auto mt-4 flex items-center justify-between px-4 py-4 sm:w-[95%] sm:px-4 md:w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%]"
>
  <div class="flex items-center gap-2">
    <a href="/">
      <h1 class="text-sm font-medium text-white">
        <div class="flex">
          Cardano
          <span class="font-thin">Things</span>
        </div>
      </h1>
    </a>
    <span class="text-white font-thin">|</span>
    <span class="text-white font-thin">Beta</span>
  </div>
</header>
