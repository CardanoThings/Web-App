<script>
	import { Button } from '$lib/components/ui/button/index.js';
	let { workshop } = $props();
</script>

<section class="mb-16 flex flex-col gap-4 text-white">
	<h1 class="max-w-[50%] text-6xl font-medium text-white">
		{workshop.title.split(':')[0]}:
		<br />
		{workshop.title.split(':')[1]}
	</h1>
	<div class="max-w-[420px]">
		<p class="mb-8 text-lg font-thin">{workshop.description}</p>

		<ol>
			{#each workshop.steps as step}
				<li class="mb-4">
					{step.title}
					<p class="font-thin">
						{step.description}
					</p>
					<Button href={step.link} variant="secondary" class="mt-2 mb-4" size="sm">Read More</Button
					>
				</li>
			{/each}
		</ol>
	</div>
</section>
