import { introductions } from '$lib/data/introductions.js';
import { error } from '@sveltejs/kit';

export function load({ params }) {
    const introduction = introductions.find(i => i.slug === params.slug);
    
    if (!introduction) {
        throw error(404, 'Introduction not found');
    }
    
    return introduction;
}
