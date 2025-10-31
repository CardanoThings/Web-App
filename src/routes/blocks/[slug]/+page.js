import { blocks } from '$lib/data/blocks.js';
import { error } from '@sveltejs/kit';

export function load({ params }) {
    const block = blocks.find(b => b.slug === params.slug);
    
    if (!block) {
        throw error(404, 'Block not found');
    }
    
    return block;
}
