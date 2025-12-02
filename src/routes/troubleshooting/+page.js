export function load({ url }) {
    return {
        searchTerm: url.searchParams.get('issue') || ''
    };
}



