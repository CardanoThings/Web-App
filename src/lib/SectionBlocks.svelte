<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { blocks } from '$lib/data/blocks.js';
</script>

<div class="sectionWrapper">
	<section id="blocks" class="mb-16">
		<div class="text-white">
			<h1 class="text-4xl">Building Blocks</h1>
			<p class="mt-2 max-w-[90%] text-lg font-thin">
				Easy to use building blocks for your ESP32 that will get you going with your own projects.
			</p>
		</div>

		{#each blocks as item}
			<Card.Root>
				<Card.Header class="p-4 pb-0">
					<Card.Title class="text-lg">{item.title}</Card.Title>
					<Card.Description class="mb-0 p-0">
						{item.description}
					</Card.Description>
				</Card.Header>
				<Card.Content class="p-4">
					<p>{item.content}</p>
					<Button href={item.link} size="sm">Learn More</Button>
				</Card.Content>
			</Card.Root>
		{/each}
	</section>
</div>
