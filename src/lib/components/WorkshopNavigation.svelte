<script>
	import { page } from '$app/state';
	import { workshops } from '$lib/data/workshops.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ChevronRight, ArrowRight } from 'lucide-svelte';

	let currentPath = $derived(page.url.pathname);

	// Find current workshop and step, then determine next navigation target
	let navigationTarget = $derived.by(() => {
		// Parse the current path to find workshop and step
		const pathParts = currentPath.split('/').filter(Boolean);

		if (pathParts.length < 2 || pathParts[0] !== 'workshops') {
			return null;
		}

		const workshopSlug = pathParts[1]; // e.g., "01-basics"
		const stepSlug = pathParts[2]; // e.g., "cardano-setup" or undefined

		// Find the current workshop
		const workshopIndex = workshops.findIndex((w) => {
			const workshopPathParts = w.link.split('/').filter(Boolean);
			return workshopPathParts[workshopPathParts.length - 1] === workshopSlug;
		});

		if (workshopIndex === -1) {
			return null;
		}

		const currentWorkshop = workshops[workshopIndex];

		// If we're on a step page, find the current step
		if (stepSlug) {
			const currentStepIndex = currentWorkshop.steps.findIndex((step) => {
				if (!step.link) return false;
				const stepPathParts = step.link.split('/').filter(Boolean);
				return stepPathParts[stepPathParts.length - 1] === stepSlug;
			});

			if (currentStepIndex !== -1) {
				// Check if there's a next step in the current workshop
				const nextStepIndex = currentStepIndex + 1;
				if (nextStepIndex < currentWorkshop.steps.length) {
					const nextStep = currentWorkshop.steps[nextStepIndex];
					if (nextStep.link) {
						return {
							type: 'step',
							title: nextStep.title,
							link: nextStep.link,
							workshopTitle: currentWorkshop.title
						};
					}
				}
			}
		} else {
			// If we're on the workshop overview page, show the first step
			if (currentWorkshop.steps.length > 0 && currentWorkshop.steps[0].link) {
				return {
					type: 'step',
					title: currentWorkshop.steps[0].title,
					link: currentWorkshop.steps[0].link,
					workshopTitle: currentWorkshop.title
				};
			}
		}

		// If we're on the last step, go to next workshop
		const nextWorkshopIndex = workshopIndex + 1;
		if (nextWorkshopIndex < workshops.length) {
			const nextWorkshop = workshops[nextWorkshopIndex];
			return {
				type: 'workshop',
				title: nextWorkshop.title,
				link: nextWorkshop.link
			};
		}

		// No next workshop or step
		return null;
	});
</script>

{#if navigationTarget}
	<nav
		class="mt-16 flex items-center justify-between border-t border-dashed border-white pt-8 text-white"
	>
		<div class="flex flex-col gap-2">
			<span class="text-sm font-thin text-white/60">
				{#if navigationTarget.type === 'step'}
					Next Step
				{:else}
					Next Workshop
				{/if}
			</span>
			<h3 class="text-2xl font-medium">{navigationTarget.title}</h3>
		</div>
		<Button
			href={navigationTarget.link}
			variant="secondary"
			size="lg"
			class="flex items-center gap-2"
		>
			Continue
			{#if navigationTarget.type === 'step'}
				<ChevronRight size={20} />
			{:else}
				<ArrowRight size={20} />
			{/if}
		</Button>
	</nav>
{/if}
