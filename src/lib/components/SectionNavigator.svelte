<script>
	import { onMount } from 'svelte';
	import { ChevronRight } from 'lucide-svelte';

	let { children } = $props();
	let containerElement;
	let sectionsList = $state([]);
	let activeSectionId = $state('');

	onMount(() => {
		if (!containerElement) return;

		// Find all sections with h2 headings
		const sections = containerElement.querySelectorAll('section');
		sectionsList = Array.from(sections)
			.map((section) => {
				const h2 = section.querySelector('h2');
				if (!h2) return null;

				// Generate ID from h2 text if section doesn't have one
				let id = section.id;
				if (!id) {
					id = h2.textContent
						.trim()
						.toLowerCase()
						.replace(/[^a-z0-9]+/g, '-')
						.replace(/^-+|-+$/g, '');
					section.id = id;
				}

				return {
					id,
					title: h2.textContent.trim(),
					element: section
				};
			})
			.filter(Boolean);

		// Set up Intersection Observer to track active section
		const observerOptions = {
			rootMargin: '-20% 0px -70% 0px',
			threshold: 0
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					activeSectionId = entry.target.id;
				}
			});
		}, observerOptions);

		sectionsList.forEach((section) => {
			if (section.element) {
				observer.observe(section.element);
			}
		});

		// Set initial active section
		if (sectionsList.length > 0) {
			activeSectionId = sectionsList[0].id;
		}

		return () => {
			sectionsList.forEach((section) => {
				if (section.element) {
					observer.unobserve(section.element);
				}
			});
		};
	});

	function scrollToSection(id) {
		const element = document.getElementById(id);
		if (element) {
			const offset = 100; // Offset from top
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		}
	}
</script>

<div class="relative flex gap-16">
	<!-- Main Content -->
	<div bind:this={containerElement} class="flex-1">
		{@render children?.()}
	</div>

	<!-- Sticky Sidebar -->
	{#if sectionsList.length > 0}
		<aside
			class="sticky top-6 mt-5 hidden h-fit w-1/4 shrink-0 md:block"
			aria-label="Table of contents"
		>
			<nav class="flex flex-col gap-2">
				<h3 class="mb-2 text-sm font-medium tracking-wider text-white uppercase">Contents</h3>
				{#each sectionsList as section}
					<a
						href="#{section.id}"
						onclick={(e) => {
							e.preventDefault();
							scrollToSection(section.id);
						}}
						class="flex items-center gap-1 text-sm whitespace-nowrap text-slate-500 transition-colors hover:text-white {activeSectionId ===
						section.id
							? 'font-medium text-white'
							: ''}"
					>
						<ChevronRight size={14} strokeWidth={2} class="shrink-0" />
						<span class="truncate">{section.title}</span>
					</a>
				{/each}
			</nav>
		</aside>
	{/if}
</div>

<style>
	:global(section[id]) {
		scroll-margin-top: 100px;
	}
</style>
