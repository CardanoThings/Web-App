<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import Carousel from '$lib/base/Carousel.svelte';
</script>

<div class="mb-4 text-white">
	<h1 class="text-3xl">Featured Projects</h1>
	<p class="mt-2 max-w-[90%] text-lg font-thin">
		Check out some of the projects built by the community using CardanoThings.io.
	</p>
</div>
<Carousel
	particlesToShow={2}
	particlesToScroll={1}
	autoplay={true}
	autoplayInterval={5000}
	arrows={false}
	gap={12}
>
	<Card.Root>
		<Card.Header>
			<Card.Title>Slide 1</Card.Title>
		</Card.Header>
		<Card.Content>
			<p>This is the content of the slide.</p>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Slide 2</Card.Title>
		</Card.Header>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Slide 3</Card.Title>
		</Card.Header>
		<Card.Content>
			<p>This is the content of the slide.</p>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Slide 4</Card.Title>
		</Card.Header>
		<Card.Content>
			<p>This is the content of the slide.</p>
		</Card.Content>
	</Card.Root>
</Carousel>
