/**
 * Same-origin URLs for workshop file content mirrored under static/cache/
 * (see scripts/sync-workshops-to-static.mjs).
 */
export function getLiveCodeRawUrl(repo, branch, filePath) {
	const p = String(filePath).replace(/^\/+/, '');
	return `/cache/${repo}/${branch}/${p}`;
}
