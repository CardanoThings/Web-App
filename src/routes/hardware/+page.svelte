<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	const { data } = $props();
</script>

<section class="mb-16 flex flex-col gap-4 text-white">
	<h1 class="w-1/2 text-6xl font-medium">Hardware</h1>
	<p class="w-1/2 text-lg font-thin">
		Essential hardware components and development boards for building IoT projects on
		CardanoThings.io
	</p>

	<div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each data.hardware as item}
			<Card.Root class="gap-2">
				<Card.Header>
					<Card.Title class="mt-0 pt-0 text-xl">{item.name}</Card.Title>
					<Card.Description class="leading-6">
						{item.intro}
					</Card.Description>
				</Card.Header>
				<Card.Content class="flex-1"></Card.Content>
				<Card.Footer class="mt-0 pt-0">
					<Button href={item.link} size="sm">Learn More</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</section>
