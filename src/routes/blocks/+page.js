import { blocks } from '$lib/data/blocks.js';

export function load({ url }) {
	const tagParam = url.searchParams.get('tags');
	
	// Get all unique tags from blocks
	const allTags = [...new Set(blocks.flatMap(block => block.tags || []))].sort();
	
	// Filter blocks if a tag is selected
	let filteredBlocks = blocks;
	if (tagParam) {
		filteredBlocks = blocks.filter(block => 
			block.tags && block.tags.includes(tagParam)
		);
	}
	
	return {
		blocks: filteredBlocks,
		allTags,
		selectedTag: tagParam
	};
}





