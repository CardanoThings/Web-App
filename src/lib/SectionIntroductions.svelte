<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { introductions } from '$lib/data/introductions.js';
</script>

<div class="sectionWrapper">
	<section id="introductions" class="mb-6">
		<div class="text-white">
			<h1 class="text-4xl">Introductions</h1>
			<p class="mt-2 max-w-[90%] text-lg font-thin">
				Quick introductions to all the tech needed for projects on CardanoThings.io
			</p>
		</div>

		{#each introductions as item}
			<Card.Root>
				<Card.Header>
					<Card.Title class="mt-0 pt-0 text-xl">{item.title}</Card.Title>
					<Card.Description class="leading-6">
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
