import { resources } from '$lib/data/resources.js';

export function load({ url }) {
	const tagParam = url.searchParams.get('tags');
	
	// Get all unique tags from resources
	const allTags = [...new Set(resources.flatMap(resource => resource.tags || []))].sort();
	
	// Filter resources if a tag is selected
	let filteredResources = resources;
	if (tagParam) {
		filteredResources = resources.filter(resource => 
			resource.tags && resource.tags.includes(tagParam)
		);
	}
	
	// Sort resources by title alphabetically
	filteredResources = filteredResources.sort((a, b) => 
		a.title.localeCompare(b.title)
	);
	
	return {
		resources: filteredResources,
		allTags,
		selectedTag: tagParam
	};
}
