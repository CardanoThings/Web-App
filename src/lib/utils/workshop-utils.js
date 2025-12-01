import { workshops } from '$lib/data/workshops.js';
import { error } from '@sveltejs/kit';

/**
 * Finds workshop and step data based on the URL pathname
 * @param {string} pathname - The URL pathname (e.g., "/workshops/04-cardano-ticker/gathering-data")
 * @returns {{workshop: object, step: object}} - The workshop and step objects
 */
export function findWorkshopStep(pathname) {
	const pathParts = pathname.split('/').filter(Boolean);
	
	if (pathParts.length < 3 || pathParts[0] !== 'workshops') {
		throw error(404, 'Invalid workshop path');
	}

	const workshopSlug = pathParts[1]; // e.g., "04-cardano-ticker"
	const stepSlug = pathParts[2]; // e.g., "gathering-data"

	// Find the workshop
	const workshop = workshops.find((w) => {
		const workshopPathParts = w.link.split('/').filter(Boolean);
		return workshopPathParts[workshopPathParts.length - 1] === workshopSlug;
	});

	if (!workshop) {
		throw error(404, 'Workshop not found');
	}

	// Find the step
	const step = workshop.steps.find((s) => {
		if (!s.link) return false;
		const stepPathParts = s.link.split('/').filter(Boolean);
		return stepPathParts[stepPathParts.length - 1] === stepSlug;
	});

	if (!step) {
		throw error(404, 'Step not found');
	}

	return { workshop, step };
}

