<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import Carousel from '$lib/base/Carousel.svelte';
	import { projects } from '$lib/data/projects.js';
</script>

<div class="mb-4 text-white">
	<h1 class="text-3xl">Featured Projects</h1>
	<p class="mt-2 max-w-[90%] text-lg font-thin">
		Check out some of the IoT projects built by the Cardano community.
	</p>
</div>
<Carousel
	particlesToShow={2}
	particlesToScroll={1}
	autoplay={true}
	autoplayInterval={5000}
	arrows={false}
	gap={24}
>
	{#each projects as project}
		<Card.Root class="mt-0 border-0 pt-0">
			{#if project.image}
				<div class="relative aspect-square w-full overflow-hidden rounded-t-lg border-0">
					<img
						src={project.image}
						alt={project.title}
						class="h-full w-full border-0 object-cover"
						loading="lazy"
					/>
				</div>
			{/if}
			<Card.Header>
				<Card.Title class="mt-0 pt-0 text-xl">{project.title}</Card.Title>
				{#if project.author}
					<Card.Description class="text-sm text-slate-400">
						By <a href={project.link_author} target="_blank" rel="noopener noreferrer"
							>{project.author}</a
						>
					</Card.Description>
				{/if}
			</Card.Header>
			<Card.Content>
				<p class="text-sm text-slate-600">{project.description}</p>
			</Card.Content>
			{#if project.link}
				<Card.Footer class="mt-0 pt-0">
					<Button
						href={project.link}
						target="_blank"
						rel="noopener noreferrer"
						size="sm"
						class="bg-black text-xs text-white transition-all hover:bg-slate-800"
					>
						View Project
					</Button>
				</Card.Footer>
			{/if}
		</Card.Root>
	{/each}
</Carousel>
