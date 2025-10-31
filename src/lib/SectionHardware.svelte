<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { hardware } from '$lib/data/hardware.js';
</script>

<section id="hardware" class="mb-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
	<div class="text-white">
		<h1 class="text-4xl">Hardware</h1>
		<p class="mt-2 max-w-[90%] text-lg leading-relaxed font-thin">
			Essential hardware components and development boards for building IoT projects on
			CardanoThings.io
		</p>
	</div>

	{#each hardware as item}
		<Card.Root>
			<Card.Header>
				<Card.Title class="mt-0 pt-0 text-xl">{item.name}</Card.Title>
				<Card.Description class="leading-6">
					{item.intro}
				</Card.Description>
			</Card.Header>
			<Card.Content class="flex-1"></Card.Content>
			<Card.Footer>
				<Button href={item.link} size="sm">Learn More</Button>
			</Card.Footer>
		</Card.Root>
	{/each}
</section>
