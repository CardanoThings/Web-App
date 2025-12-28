<script>
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { cn } from '$lib/utils.js';

	let {
		images = [],
		alt = 'Image',
		autoplay = false,
		autoplayInterval = 5000,
		showIndicators = true,
		showArrows = true,
		class: className
	} = $props();

	let currentIndex = $state(0);
	let autoplayTimer = null;
	let isHovered = $state(false);

	// Handle autoplay
	function startAutoplay() {
		stopAutoplay(); // Clear any existing timer
		if (autoplay && images.length > 1 && !isHovered) {
			autoplayTimer = setInterval(() => {
				currentIndex = (currentIndex + 1) % images.length;
			}, autoplayInterval);
		}
	}

	function stopAutoplay() {
		if (autoplayTimer) {
			clearInterval(autoplayTimer);
			autoplayTimer = null;
		}
	}

	function next() {
		currentIndex = (currentIndex + 1) % images.length;
	}

	function prev() {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}

	function goToSlide(index) {
		currentIndex = index;
	}

	function handleMouseEnter() {
		isHovered = true;
		stopAutoplay();
	}

	function handleMouseLeave() {
		isHovered = false;
		if (autoplay) {
			startAutoplay();
		}
	}

	onMount(() => {
		if (autoplay) {
			startAutoplay();
		}
	});

	onDestroy(() => {
		stopAutoplay();
	});
</script>

<div
	class={cn('relative w-full overflow-hidden rounded-lg', className)}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	role="region"
	aria-label="Image slideshow"
>
	<!-- Images Container -->
	<div class="relative aspect-video w-full">
		{#key currentIndex}
			<div
				in:fade={{ duration: 500 }}
				out:fade={{ duration: 500, delay: 500 }}
				class="absolute inset-0"
			>
				<img
					src={images[currentIndex]}
					alt={`${alt} ${currentIndex + 1}`}
					class="h-full w-full object-cover object-center"
					loading={currentIndex === 0 ? 'eager' : 'lazy'}
				/>
			</div>
		{/key}
	</div>

	<!-- Navigation Arrows -->
	{#if showArrows && images.length > 1}
		<button
			type="button"
			onclick={prev}
			class="absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 text-black shadow-lg transition-all hover:bg-white focus:ring-2 focus:ring-white/50 focus:outline-none"
			aria-label="Previous image"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
		</button>
		<button
			type="button"
			onclick={next}
			class="absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 text-black shadow-lg transition-all hover:bg-white focus:ring-2 focus:ring-white/50 focus:outline-none"
			aria-label="Next image"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	{/if}

	<!-- Dot Indicators -->
	{#if showIndicators && images.length > 1}
		<div class="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
			{#each images as _, index}
				<button
					type="button"
					onclick={() => goToSlide(index)}
					class={cn(
						'h-2 cursor-pointer rounded-full transition-all duration-300',
						currentIndex === index ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
					)}
					aria-label={`Go to image ${index + 1}`}
				></button>
			{/each}
		</div>
	{/if}
</div>
