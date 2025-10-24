<script>
  import { Github } from "lucide-svelte";
  import { links } from "$lib/data/links.js";
</script>

<footer
  class="mt-4 bg-slate-100 p-4 pb-8 pt-8 dark:bg-slate-900 dark:text-slate-100 w-full"
>
  <div
    class="m-auto scroll-pb-80 px-4 sm:w-[95%] sm:px-4 md:w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%]"
  >
    <div class="mb-4 text-sm font-medium">
      <ul class="leading-8">
        {#each links as page}
          <li>
            <a href={page.link}>{page.title}</a>
          </li>
        {/each}
      </ul>
    </div>

    <section>
      <p class="text-xs">&copy; 2025 CardanoThings. All rights reserved.</p>
      <br />
    </section>
  </div>
</footer>
