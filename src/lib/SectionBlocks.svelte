<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { blocks } from '$lib/data/blocks.js';
</script>

<div class="sectionWrapper">
	<section id="blocks" class="mb-6">
		<div class="text-white">
			<h1 class="text-4xl">Building Blocks</h1>
			<p class="mt-2 max-w-[90%] text-lg font-thin">
				Easy to use building blocks for your ESP32 that will get you going with your own projects.
			</p>
		</div>

		{#each blocks as item}
			<Card.Root>
				<Card.Header>
					<Card.Title class="mt-0 pt-0 text-xl">{item.title}</Card.Title>
					<Card.Description>
						{item.description}
					</Card.Description>
				</Card.Header>
				<Card.Content class="flex-1"></Card.Content>
				<Card.Footer>
					<Button href={item.link} size="sm">Learn More</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
	</section>
</div>
