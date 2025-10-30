<script>
  let { workshop } = $props();
</script>

<section class="flex text-white flex-col mb-16 gap-4">
  <h1 class="text-white font-medium text-6xl max-w-[50%]">
    {workshop.title.split(":")[0]}:
    <br />
    {workshop.title.split(":")[1]}
  </h1>
  <div class="max-w-[420px]">
    <p class="text-lg font-thin mb-8">{workshop.description}</p>

    <ol>
      {#each workshop.steps as step}
        <li class="mb-4">
          {step.title}
          <p class="font-thin">
            {step.description}
          </p>
        </li>
      {/each}
    </ol>
  </div>
</section>
