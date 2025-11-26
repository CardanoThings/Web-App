<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { workshops } from '$lib/data/workshops.js';
</script>

<section id="workshops" class="mb-12">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
		<div class="mb-6 text-white">
			<h1 class="mb-4 text-4xl">Workshops</h1>
			<p class="mt-2 max-w-[90%] text-lg leading-relaxed font-thin">
				Step-by-step workshops to build your first Cardano IoT project with ESP32-based
				Microcontrollers and CardanoThings.io
			</p>
		</div>
		{#each workshops as workshop}
			<Card.Root>
				<Card.Header>
					<Card.Title class="mt-0 pt-0 text-xl">{workshop.title}</Card.Title>
					<Card.Description class="leading-6">
						{workshop.description}
					</Card.Description>
				</Card.Header>
				<Card.Content class="flex-1"></Card.Content>
				<Card.Footer class="">
					<Button href={workshop.link} size="sm" class="text-xs">Start Workshop</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</section>
