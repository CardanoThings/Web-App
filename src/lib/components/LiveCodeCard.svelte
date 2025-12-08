<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import SyntaxHighlighter from '$lib/components/SyntaxHighlighter.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { onMount } from 'svelte';

	let {
		title = 'Code Example',
		repo = 'CardanoThings/Workshops',
		files, // Required: [{ path: string, language?: string, filename?: string }]
		readmePath = null,
		branch = 'main',
		howItWorksTitle = 'How it Works',
		defaultShowComments = true,
		defaultExpanded = false
	} = $props();

	// Normalize files array
	const normalizedFiles = $derived(() => {
		if (!files || files.length === 0) {
			return [];
		}
		return files.map((file) => ({
			path: file.path,
			language: file.language || detectLanguage(file.path),
			filename: file.filename || file.path.split('/').pop() || '',
			code: '',
			loading: false,
			error: null
		}));
	});

	let filesData = $state([]);
	let readme = $state('');
	let loading = $state(true);
	let error = $state(null);
	let howItWorksOpen = $state(false);
	let activeTab = $state('');

	// Detect language from file extension
	function detectLanguage(filePath) {
		const ext = filePath.split('.').pop()?.toLowerCase() || '';
		const langMap = {
			cpp: ['cpp', 'c', 'h', 'hpp', 'ino'],
			javascript: ['js', 'jsx', 'mjs'],
			typescript: ['ts', 'tsx'],
			python: ['py'],
			java: ['java'],
			html: ['html', 'htm'],
			css: ['css'],
			json: ['json'],
			markdown: ['md', 'markdown'],
			rust: ['rs'],
			go: ['go']
		};

		for (const [lang, exts] of Object.entries(langMap)) {
			if (exts.includes(ext)) {
				return lang;
			}
		}
		return 'cpp'; // Default
	}

	// Generate GitHub link (always points to parent folder)
	let githubLink = $state(null);

	$effect(() => {
		if (normalizedFiles().length > 0) {
			const firstPath = normalizedFiles()[0].path;
			const dirPath = firstPath.substring(0, firstPath.lastIndexOf('/'));
			githubLink = `https://github.com/${repo}/tree/${branch}/${dirPath}`;
		} else {
			githubLink = null;
		}
	});

	// Generate raw GitHub URL
	function getRawUrl(filePath) {
		return `https://raw.githubusercontent.com/${repo}/${branch}/${filePath}`;
	}

	const rawReadmeUrl = readmePath
		? `https://raw.githubusercontent.com/${repo}/${branch}/${readmePath}`
		: null;

	async function fetchFile(fileData) {
		const url = getRawUrl(fileData.path);
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(
					`Failed to fetch ${fileData.filename}: ${response.status} ${response.statusText}`
				);
			}
			return await response.text();
		} catch (err) {
			console.error(`Error fetching ${fileData.filename}:`, err);
			throw err;
		}
	}

	async function fetchFromGitHub() {
		loading = true;
		error = null;

		const filesToFetch = normalizedFiles();
		if (filesToFetch.length === 0) {
			error = 'No files provided';
			loading = false;
			return;
		}

		// Initialize files data
		filesData = filesToFetch.map((file) => ({ ...file }));

		// Set first tab as active
		if (filesData.length > 0) {
			activeTab = filesData[0].filename;
		}

		try {
			// Fetch all files in parallel
			const fetchPromises = filesData.map(async (fileData, index) => {
				fileData.loading = true;
				try {
					const code = await fetchFile(fileData);
					fileData.code = code;
					fileData.error = null;
				} catch (err) {
					fileData.error = err.message;
					fileData.code = '';
				} finally {
					fileData.loading = false;
				}
			});

			await Promise.all(fetchPromises);

			// Check if any files failed
			const hasErrors = filesData.some((f) => f.error);
			if (hasErrors && filesData.every((f) => f.error)) {
				// All files failed
				error = filesData[0].error || 'Failed to fetch files';
			}

			// Fetch README if path is provided
			if (rawReadmeUrl) {
				try {
					const readmeResponse = await fetch(rawReadmeUrl);
					if (readmeResponse.ok) {
						readme = await readmeResponse.text();
					}
					// README is optional, so we don't throw if it fails
				} catch (readmeError) {
					console.warn('Failed to fetch README:', readmeError);
				}
			}
		} catch (err) {
			error = err.message;
			console.error('Error fetching from GitHub:', err);
		} finally {
			loading = false;
		}
	}

	// Simple markdown formatting (basic conversion to HTML)
	function formatMarkdown(text) {
		if (!text) return '';

		return (
			text
				// Headers
				.replace(/^### (.*$)/gim, '<h3>$1</h3>')
				.replace(/^## (.*$)/gim, '<h2>$1</h2>')
				.replace(/^# (.*$)/gim, '<h1>$1</h1>')
				// Bold
				.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
				// Code blocks
				.replace(/```[\s\S]*?```/gim, (match) => {
					const code = match.replace(/```[\w]*\n?/g, '').trim();
					return `<pre><code>${code}</code></pre>`;
				})
				// Inline code
				.replace(/`([^`]+)`/gim, '<code>$1</code>')
				// Links
				.replace(
					/\[([^\]]+)\]\(([^)]+)\)/gim,
					'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
				)
				// Line breaks
				.replace(/\n\n/gim, '</p><p>')
				.replace(/\n/gim, '<br>')
				// Wrap in paragraph
				.replace(/^(.*)$/gim, '<p>$1</p>')
		);
	}

	onMount(() => {
		if (normalizedFiles().length > 0) {
			fetchFromGitHub();
		} else {
			error = 'No files provided';
			loading = false;
		}
	});
</script>

<Card.Root>
	<Card.Header class="mb-0 flex flex-col gap-3 pb-0 md:flex-row md:items-start md:justify-between">
		<Card.Title class="text-lg">{title}</Card.Title>
		<div class="flex gap-2">
			{#if readme}
				<Button
					onclick={() => (howItWorksOpen = true)}
					variant="outline"
					size="sm"
					class="gap-2 text-xs"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="12" r="10" />
						<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
						<path d="M12 17h.01" />
					</svg>
					How it works
				</Button>
			{/if}
			{#if githubLink}
				<Button href={githubLink} target="_blank" variant="outline" size="sm" class="gap-2 text-xs">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path
							d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
						/>
						<path d="M9 18c-4.51 2-5-2-7-2" />
					</svg>
					View on GitHub
				</Button>
			{/if}
		</div>
	</Card.Header>
	<Card.Content class="pb-6">
		{#if loading}
			<div class="flex items-center justify-center py-8">
				<div class="flex flex-col items-center gap-2">
					<svg
						class="h-8 w-8 animate-spin text-slate-400"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<p class="text-sm text-slate-400">Loading code from GitHub...</p>
				</div>
			</div>
		{:else if error && filesData.length === 0}
			<div class="rounded-md border border-red-500/50 bg-red-500/10 p-4">
				<div class="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-red-500"
					>
						<circle cx="12" cy="12" r="10" />
						<line x1="12" y1="8" x2="12" y2="12" />
						<line x1="12" y1="16" x2="12.01" y2="16" />
					</svg>
					<p class="text-sm font-medium text-red-500">Error loading code</p>
				</div>
				<p class="mt-2 text-sm text-red-400">{error}</p>
				<Button onclick={fetchFromGitHub} variant="outline" size="sm" class="mt-3">Retry</Button>
			</div>
		{:else if filesData.length > 0}
			<!-- Always use tabs, even for single file -->
			<Tabs.Root bind:value={activeTab} class="gap-0">
				<div class="flex gap-0">
					<Tabs.List class="mb-0 rounded-b-none bg-[#0b1c2c] p-1">
						{#each filesData as fileData (fileData.filename)}
							<Tabs.Trigger
								value={fileData.filename}
								class="cursor-pointer rounded-sm text-xs text-muted-foreground"
							>
								{fileData.filename}
							</Tabs.Trigger>
						{/each}
					</Tabs.List>
					<!-- rounded bottom after last tab -->
					<div class="bg-[#0b1c2c]">
						<div class="h-full rounded-bl-md bg-[white] p-1"></div>
					</div>
				</div>
				{#each filesData as fileData (fileData.filename)}
					<Tabs.Content value={fileData.filename} class="mt-0 pt-0">
						{#if fileData.loading}
							<div class="flex items-center justify-center py-8">
								<svg
									class="h-6 w-6 animate-spin text-slate-400"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										class="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="4"
									></circle>
									<path
										class="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
							</div>
						{:else if fileData.error}
							<div class="rounded-md border border-red-500/50 bg-red-500/10 p-4">
								<p class="text-sm text-red-400">{fileData.error}</p>
								<Button
									onclick={() => {
										fileData.loading = true;
										fetchFile(fileData).then(
											(code) => {
												fileData.code = code;
												fileData.error = null;
												fileData.loading = false;
											},
											(err) => {
												fileData.error = err.message;
												fileData.loading = false;
											}
										);
									}}
									variant="outline"
									size="sm"
									class="mt-3"
								>
									Retry
								</Button>
							</div>
						{:else if fileData.code}
							<SyntaxHighlighter
								language={fileData.language}
								code={fileData.code}
								{defaultShowComments}
								{defaultExpanded}
							/>
						{/if}
					</Tabs.Content>
				{/each}
			</Tabs.Root>
		{/if}
	</Card.Content>
</Card.Root>

{#if readme && howItWorksOpen}
	<Dialog.Root bind:open={howItWorksOpen}>
		<Dialog.Content class="max-h-[90vh] max-w-3xl overflow-x-hidden overflow-y-auto">
			<Dialog.Header>
				<Dialog.Title>{howItWorksTitle}</Dialog.Title>
			</Dialog.Header>
			<div class="how-it-works-content markdown-content">
				{@html formatMarkdown(readme)}
			</div>
		</Dialog.Content>
	</Dialog.Root>
{/if}

<style>
	.how-it-works-content :global(h1),
	.how-it-works-content :global(h2),
	.how-it-works-content :global(h3) {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 1.5rem 0 0.75rem 0;
		color: black;
	}

	.how-it-works-content :global(h4) {
		font-size: 1.1rem;
		font-weight: 600;
		margin: 1rem 0 0.5rem 0;
		color: black;
	}

	.how-it-works-content :global(p) {
		margin: 0.5rem 0;
		line-height: 1.6;
	}

	.how-it-works-content :global(ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin: 0.5rem 0;
	}

	.how-it-works-content :global(ol) {
		list-style-type: decimal;
		padding-left: 1.5rem;
		margin: 0.5rem 0;
	}

	.how-it-works-content :global(li) {
		margin: 0.75rem 0;
		line-height: 1.6;
	}

	.how-it-works-content :global(strong) {
		color: #5b21b6;
	}

	.how-it-works-content :global(code) {
		background: rgba(255, 255, 255, 0.1);
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.9em;
		color: #34d399;
	}

	.how-it-works-content :global(pre) {
		background: rgba(0, 0, 0, 0.1);
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 1rem 0;
	}

	.how-it-works-content :global(pre code) {
		background: transparent;
		padding: 0;
		color: inherit;
	}

	.how-it-works-content :global(a) {
		color: #5b21b6;
		text-decoration: underline;
		word-break: break-all;
		overflow-wrap: break-word;
	}

	.how-it-works-content :global(a:hover) {
		color: #6d28d9;
	}

	.how-it-works-content {
		overflow-wrap: break-word;
		word-wrap: break-word;
		overflow-x: hidden;
		max-width: 100%;
	}
</style>
