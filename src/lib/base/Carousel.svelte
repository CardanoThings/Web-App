<script>
	import { cn } from '$lib/utils.js';
	import { onMount, onDestroy } from 'svelte';

	let {
		particlesToShow = 1,
		particlesToScroll = 1,
		autoplay = false,
		autoplayInterval = 3000,
		arrows = true,
		gap = 24,
		class: className,
		children,
		...restProps
	} = $props();

	let carouselContainer;
	let carouselTrack;
	let stagingContainer;
	let currentIndex = $state(0);
	let autoplayTimer;
	let isTransitioning = $state(false);
	let totalItems = $state(0);
	let windowWidth = $state(typeof window !== 'undefined' ? window.innerWidth : 1024);

	// Responsive particlesToShow: show 1 on small screens, use prop value on larger screens
	let responsiveParticlesToShow = $derived.by(() => {
		const breakpoint = 768; // md breakpoint
		return windowWidth < breakpoint ? 1 : particlesToShow;
	});

	// Calculate pages
	let totalPages = $derived.by(() => {
		if (totalItems === 0) return 0;
		return Math.ceil(totalItems / responsiveParticlesToShow);
	});

	let currentPage = $derived.by(() => {
		if (totalPages === 0) return 0;
		const page = Math.floor(currentIndex / particlesToScroll);
		return page % totalPages;
	});

	// Get visible slide indices for indicator highlighting
	let visibleSlides = $derived.by(() => {
		if (totalItems === 0) return [];
		const visible = [];
		for (let i = 0; i < responsiveParticlesToShow; i++) {
			visible.push((currentIndex + i) % totalItems);
		}
		return visible;
	});

	function getItemWidth() {
		if (!carouselTrack || carouselTrack.children.length === 0) return 0;
		const firstChild = carouselTrack.children[0];
		return firstChild.offsetWidth || 0;
	}

	function goToIndex(index, smooth = true) {
		if (!carouselTrack || isTransitioning || totalItems === 0) return;

		isTransitioning = true;
		const itemWidth = getItemWidth();
		const translateX = -(index * (itemWidth + gap));

		carouselTrack.style.transition = smooth ? 'transform 0.5s ease-in-out' : 'none';
		carouselTrack.style.transform = `translateX(${translateX}px)`;

		// Reset transition after animation
		setTimeout(
			() => {
				isTransitioning = false;
				// Handle infinite loop - jump seamlessly
				if (index >= totalItems) {
					currentIndex = index % totalItems;
					carouselTrack.style.transition = 'none';
					const newTranslateX = -(currentIndex * (itemWidth + gap));
					carouselTrack.style.transform = `translateX(${newTranslateX}px)`;
				} else if (index < 0) {
					currentIndex = totalItems + (index % totalItems);
					carouselTrack.style.transition = 'none';
					const newTranslateX = -(currentIndex * (itemWidth + gap));
					carouselTrack.style.transform = `translateX(${newTranslateX}px)`;
				} else {
					currentIndex = index;
				}
			},
			smooth ? 500 : 0
		);
	}

	function next() {
		goToIndex(currentIndex + particlesToScroll);
	}

	function prev() {
		goToIndex(currentIndex - particlesToScroll);
	}

	function goToPage(page) {
		const index = page * particlesToScroll;
		goToIndex(index);
	}

	function goToSlide(slideIndex) {
		goToIndex(slideIndex);
	}

	function startAutoplay() {
		if (autoplay && autoplayInterval > 0) {
			autoplayTimer = setInterval(() => {
				next();
			}, autoplayInterval);
		}
	}

	function stopAutoplay() {
		if (autoplayTimer) {
			clearInterval(autoplayTimer);
			autoplayTimer = null;
		}
	}

	function setupCarousel() {
		if (!stagingContainer || !carouselTrack) return;

		// Get the inner flex container
		const flexContainer = stagingContainer.querySelector('.flex');
		if (!flexContainer) return;

		// Get all direct child elements from the flex container
		const childElements = Array.from(flexContainer.children);
		totalItems = childElements.length;

		if (totalItems === 0) return;

		// Clear track
		carouselTrack.innerHTML = '';

		const itemWidthStyle = `calc((100% - ${(responsiveParticlesToShow - 1) * gap}px) / ${responsiveParticlesToShow})`;

		// Wrap and clone items
		const wrappedItems = childElements.map((child) => {
			const wrapper = document.createElement('div');
			wrapper.className = 'carousel-item flex-shrink-0';
			wrapper.style.width = itemWidthStyle;
			// Clone the child node deeply to preserve structure
			wrapper.appendChild(child.cloneNode(true));
			return wrapper;
		});

		// Clone items at the end
		wrappedItems.forEach((wrapper) => {
			carouselTrack.appendChild(wrapper.cloneNode(true));
		});

		// Add original wrapped items
		wrappedItems.forEach((wrapper) => {
			carouselTrack.appendChild(wrapper);
		});

		// Clone items at the beginning
		wrappedItems.forEach((wrapper) => {
			carouselTrack.appendChild(wrapper.cloneNode(true));
		});

		// Initialize position at the start of original items (middle section)
		setTimeout(() => {
			const itemWidth = getItemWidth();
			const startIndex = totalItems;
			carouselTrack.style.transition = 'none';
			carouselTrack.style.transform = `translateX(${-(startIndex * (itemWidth + gap))}px)`;
			currentIndex = 0;
		}, 10);
	}

	// Handle window resize for responsive behavior
	function handleWindowResize() {
		if (typeof window !== 'undefined') {
			windowWidth = window.innerWidth;
			// Recalculate carousel when breakpoint changes
			if (carouselTrack && totalItems > 0) {
				setupCarousel();
			}
		}
	}

	onMount(() => {
		// Wait for children to render, then setup
		const checkInterval = setInterval(() => {
			if (stagingContainer) {
				const flexContainer = stagingContainer.querySelector('.flex');
				if (flexContainer && flexContainer.children.length > 0) {
					clearInterval(checkInterval);
					setupCarousel();
					if (autoplay) {
						startAutoplay();
					}
				}
			}
		}, 50);

		// Timeout after 2 seconds
		setTimeout(() => {
			clearInterval(checkInterval);
		}, 2000);

		// Add window resize listener for responsive behavior
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleWindowResize);
		}
	});

	onDestroy(() => {
		stopAutoplay();
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', handleWindowResize);
		}
	});

	// Handle container resize for position recalculation
	let resizeObserver;
	onMount(() => {
		if (typeof ResizeObserver !== 'undefined') {
			resizeObserver = new ResizeObserver(() => {
				// Recalculate position on resize
				if (carouselTrack) {
					const itemWidth = getItemWidth();
					carouselTrack.style.transition = 'none';
					carouselTrack.style.transform = `translateX(${-(currentIndex * (itemWidth + gap))}px)`;
					// Also update window width for responsive calculations
					if (typeof window !== 'undefined') {
						windowWidth = window.innerWidth;
					}
					setupCarousel();
				}
			});
			if (carouselContainer) {
				resizeObserver.observe(carouselContainer);
			}
		}
	});

	onDestroy(() => {
		if (resizeObserver) {
			resizeObserver.disconnect();
		}
	});
</script>

<div
	bind:this={carouselContainer}
	class={cn('relative w-full', className)}
	{...restProps}
	onmouseenter={stopAutoplay}
	onmouseleave={() => {
		if (autoplay) startAutoplay();
	}}
>
	<!-- Staging container to render children and detect them -->
	<div
		bind:this={stagingContainer}
		class="pointer-events-none absolute opacity-0"
		style="visibility: hidden; width: 100%;"
	>
		<div class="flex" style="gap: {gap}px;">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>

	<!-- Carousel Track -->
	<div class="relative overflow-hidden">
		<div bind:this={carouselTrack} class="flex" style="will-change: transform; gap: {gap}px;">
			<!-- Items will be cloned and inserted here via JavaScript -->
		</div>
	</div>

	<!-- Navigation Arrows -->
	{#if arrows && totalPages > 1}
		<button
			type="button"
			onclick={prev}
			class="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-black shadow-lg transition-all hover:bg-white"
			aria-label="Previous"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>
		<button
			type="button"
			onclick={next}
			class="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-black shadow-lg transition-all hover:bg-white"
			aria-label="Next"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	{/if}

	<!-- Slide Indicators -->
	{#if totalItems > 1}
		<div class="mt-6 flex justify-center gap-1.5">
			{#each Array(totalItems) as _, slideIndex}
				<button
					type="button"
					onclick={() => goToSlide(slideIndex)}
					class={cn(
						'h-2 rounded-full transition-all duration-500',
						visibleSlides.includes(slideIndex)
							? 'w-4 bg-white'
							: 'w-2 bg-white/50 hover:bg-white/75'
					)}
					aria-label={`Go to slide ${slideIndex + 1}`}
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	:global([data-slot='card']) {
		height: 100%;
	}

	:global(.carousel-item) {
		flex-shrink: 0;
	}
</style>
