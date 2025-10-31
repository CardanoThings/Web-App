import { hardware } from '$lib/data/hardware.js';
import { error } from '@sveltejs/kit';

export function load({ params }) {
    const item = hardware.find(h => h.slug === params.slug);

    if (!item) {
        throw error(404, 'Hardware not found');
    }

    return {
        hardware: item
    };
}
