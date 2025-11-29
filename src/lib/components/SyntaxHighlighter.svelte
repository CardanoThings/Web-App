<script>
	import { onMount, onDestroy, tick } from 'svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		Copy,
		Check,
		ChevronDown,
		ChevronUp,
		MessageSquare,
		MessageSquareOff
	} from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/javascript';
	import xml from 'highlight.js/lib/languages/xml';
	import json from 'highlight.js/lib/languages/json';
	import cpp from 'highlight.js/lib/languages/cpp';
	import c from 'highlight.js/lib/languages/c';
	import 'highlight.js/styles/base16/harmonic16-dark.css';

	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('json', json);
	hljs.registerLanguage('cpp', cpp);
	hljs.registerLanguage('c', c);
	hljs.registerLanguage('arduino', cpp); // Use cpp for Arduino code

	/**
	 * @type {string} The programming language for syntax highlighting
	 */
	export let language = 'javascript';

	/**
	 * @type {string} The code to highlight
	 */
	export let code = '';

	/**
	 * @type {boolean} Whether to show comments by default
	 */
	export let defaultShowComments = true;

	/**
	 * @type {boolean} Whether to show full code by default (no collapse)
	 */
	export let defaultExpanded = false;

	let highlightedCode = '';
	let fullHighlightedCode = '';
	let isCopied = false;
	let copyTimeout = null;
	let previousCode = '';
	let previousLanguage = '';
	let previousShowComments = false;
	let normalizedCodeForCopy = '';
	let isExpanded = false;
	let lineCount = 0;
	const MAX_LINES_COLLAPSED = 25;
	let showComments = false;

	// React to prop changes
	$: isExpanded = defaultExpanded;
	$: showComments = defaultShowComments;

	onMount(async () => {
		await highlightCode();
	});

	// Optimize reactive statement to re-highlight when code, language, or comment visibility changes
	$: if (
		code !== previousCode ||
		language !== previousLanguage ||
		showComments !== previousShowComments
	) {
		previousCode = code;
		previousLanguage = language;
		previousShowComments = showComments;
		highlightCode();
	}

	/**
	 * Normalizes indentation by detecting the minimum indentation and removing it from all lines
	 * This ensures consistent indentation regardless of how the code is formatted in the source
	 * Handles both spaces and tabs, converting tabs to spaces for consistent normalization
	 * Only removes indentation if ALL non-empty lines have at least some indentation
	 */
	function normalizeIndentation(text) {
		if (!text) return text;

		const lines = text.split('\n');
		const nonEmptyLines = lines.filter((line) => line.trim().length > 0);

		if (nonEmptyLines.length === 0) {
			return text.replace(/^\n+|\n+$/g, '');
		}

		// Convert tabs to spaces (using 2 spaces per tab to match tab-size)
		const TAB_SIZE = 2;
		const linesWithSpaces = lines.map((line) => line.replace(/\t/g, ' '.repeat(TAB_SIZE)));

		// Find the minimum indentation (number of leading spaces) from non-empty lines
		const indentLengths = linesWithSpaces
			.filter((line) => line.trim().length > 0)
			.map((line) => {
				const match = line.match(/^(\s*)/);
				return match ? match[1].length : 0;
			});

		// Only normalize if ALL non-empty lines have some indentation
		// If any line starts at column 0, don't remove any indentation
		const hasZeroIndent = indentLengths.some((length) => length === 0);

		if (hasZeroIndent || indentLengths.length === 0) {
			// Some lines start at column 0, so don't remove indentation
			// Just trim leading/trailing empty lines
			return text.replace(/^\n+|\n+$/g, '');
		}

		const minIndent = Math.min(...indentLengths);

		// Safety check: don't remove more than the minimum
		if (minIndent <= 0) {
			return text.replace(/^\n+|\n+$/g, '');
		}

		// Remove the minimum indentation from all lines
		const normalized = linesWithSpaces
			.map((line) => {
				// For empty lines, keep them as is
				if (line.trim().length === 0) return line;
				// Remove the minimum indentation, but ensure we don't go beyond the line length
				const indentToRemove = Math.min(minIndent, line.length);
				return line.slice(indentToRemove);
			})
			.join('\n');

		// Trim leading/trailing empty lines
		return normalized.replace(/^\n+|\n+$/g, '');
	}

	/**
	 * Removes comment lines from code
	 * Handles single-line comments (//) and multi-line comments
	 * Preserves preprocessor directives (lines starting with #)
	 * Preserves empty lines for code readability
	 * Removes entire lines that start with comments
	 */
	function removeComments(text, showComments) {
		if (!text || showComments) return text;

		const lines = text.split('\n');
		const filteredLines = [];
		let inMultiLineComment = false;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const isOriginallyEmpty = line.trim().length === 0;
			let processedLine = line;

			// Handle multi-line comments
			if (inMultiLineComment) {
				// Check if this line ends the multi-line comment
				const endIndex = processedLine.indexOf('*/');
				if (endIndex !== -1) {
					// Multi-line comment ends on this line
					inMultiLineComment = false;
					// Keep only the part after the comment
					processedLine = processedLine.substring(endIndex + 2).trimStart();
					// If nothing remains after the comment, check if line was originally empty
					if (processedLine.trim().length === 0) {
						// If line was originally empty, preserve it; otherwise remove it (it was a comment-only line)
						if (isOriginallyEmpty) {
							filteredLines.push('');
						}
						continue;
					}
				} else {
					// Still inside multi-line comment
					// If line starts with comment (only whitespace before comment), remove entire line
					// Otherwise preserve empty lines
					if (isOriginallyEmpty) {
						filteredLines.push('');
					}
					// Skip comment-only lines inside multi-line comments
					continue;
				}
			}

			// Check for start of multi-line comment
			const multiLineStart = processedLine.indexOf('/*');
			if (multiLineStart !== -1) {
				const multiLineEnd = processedLine.indexOf('*/', multiLineStart + 2);
				if (multiLineEnd !== -1) {
					// Multi-line comment on same line
					processedLine =
						processedLine.substring(0, multiLineStart) + processedLine.substring(multiLineEnd + 2);
					processedLine = processedLine.trim();
				} else {
					// Multi-line comment starts but doesn't end on this line
					// Check if comment starts at the beginning of the line (after whitespace)
					const trimmedBeforeComment = processedLine.substring(0, multiLineStart).trim();
					if (trimmedBeforeComment.length === 0) {
						// Comment starts at beginning of line, remove entire line
						inMultiLineComment = true;
						continue;
					}
					// Multi-line comment starts but doesn't end on this line
					inMultiLineComment = true;
					// Keep only the part before the comment
					processedLine = processedLine.substring(0, multiLineStart).trimEnd();
					// If nothing remains before the comment, check if line was originally empty
					if (processedLine.trim().length === 0) {
						if (isOriginallyEmpty) {
							filteredLines.push('');
						}
						continue;
					}
				}
			}

			// Check if line starts with a single-line comment (// after optional whitespace)
			const trimmedLine = processedLine.trim();
			if (trimmedLine.startsWith('//')) {
				// Entire line is a comment, remove it completely
				continue;
			}

			// Remove single-line comments (// only, not #)
			// Only remove if // is not inside a string
			const singleLineComment = processedLine.match(/\/\/(?=(?:[^"']|"[^"]*"|'[^']*')*$)/);
			if (singleLineComment) {
				const commentIndex = singleLineComment.index;
				// Check if comment starts at the beginning (after whitespace)
				const beforeComment = processedLine.substring(0, commentIndex).trim();
				if (beforeComment.length === 0) {
					// Comment starts at beginning of line, remove entire line
					continue;
				}
				// Comment is after code, just remove the comment part
				processedLine = processedLine.substring(0, commentIndex).trimEnd();
			}

			// Preserve empty lines and add non-empty lines
			if (isOriginallyEmpty) {
				filteredLines.push('');
			} else if (processedLine.trim().length > 0) {
				filteredLines.push(processedLine);
			} else {
				// Line became empty after comment removal
				// This means it was a comment-only line, so don't preserve it
				continue;
			}
		}

		return filteredLines.join('\n');
	}

	async function highlightCode() {
		if (!code) {
			highlightedCode = '';
			fullHighlightedCode = '';
			normalizedCodeForCopy = '';
			lineCount = 0;
			return;
		}

		await tick();
		try {
			// Normalize indentation first
			let normalizedCode = normalizeIndentation(code);

			// Remove comments if they're toggled off
			const codeForHighlighting = removeComments(normalizedCode, showComments);

			// Store the version with comments for copying (always copy full code with comments)
			normalizedCodeForCopy = normalizedCode;
			lineCount = codeForHighlighting.split('\n').length;

			const result = hljs.highlight(codeForHighlighting, {
				language: language === 'arduino' ? 'cpp' : language,
				ignoreIllegals: true
			});
			fullHighlightedCode = result.value;

			// If code is longer than MAX_LINES_COLLAPSED, show only first 25 lines initially
			if (lineCount > MAX_LINES_COLLAPSED && !isExpanded) {
				const lines = fullHighlightedCode.split('\n');
				highlightedCode = lines.slice(0, MAX_LINES_COLLAPSED).join('\n').replace(/\n+$/, '');
			} else {
				highlightedCode = fullHighlightedCode.replace(/\n+$/, '');
			}
		} catch (error) {
			// Fallback to plain text if highlighting fails
			console.warn(`Syntax highlighting failed for language "${language}":`, error);
			let normalizedCode = normalizeIndentation(code);
			const codeForHighlighting = removeComments(normalizedCode, showComments);
			normalizedCodeForCopy = normalizedCode;
			lineCount = codeForHighlighting.split('\n').length;
			const escapedCode = codeForHighlighting.replace(/</g, '&lt;').replace(/>/g, '&gt;');
			fullHighlightedCode = escapedCode;

			// If code is longer than MAX_LINES_COLLAPSED, show only first 25 lines initially
			if (lineCount > MAX_LINES_COLLAPSED && !isExpanded) {
				const lines = escapedCode.split('\n');
				highlightedCode = lines.slice(0, MAX_LINES_COLLAPSED).join('\n').replace(/\n+$/, '');
			} else {
				highlightedCode = escapedCode.replace(/\n+$/, '');
			}
		}
	}

	function toggleExpand() {
		isExpanded = !isExpanded;
		if (isExpanded) {
			highlightedCode = fullHighlightedCode.replace(/\n+$/, '');
		} else {
			const lines = fullHighlightedCode.split('\n');
			highlightedCode = lines.slice(0, MAX_LINES_COLLAPSED).join('\n').replace(/\n+$/, '');
		}
	}

	function toggleComments() {
		showComments = !showComments;
		// Reactive statement will trigger highlightCode() automatically
	}

	async function copyCode() {
		if (!normalizedCodeForCopy && !code) return;

		try {
			// Copy the normalized code (what the user sees) rather than the original
			const codeToCopy = normalizedCodeForCopy || code;
			await navigator.clipboard.writeText(codeToCopy);
			isCopied = true;
			toast.success('Code copied to clipboard');

			// Clear any existing timeout
			if (copyTimeout) {
				clearTimeout(copyTimeout);
			}

			// Reset the copied state after 2 seconds
			copyTimeout = setTimeout(() => {
				isCopied = false;
			}, 2000);
		} catch (error) {
			console.error('Failed to copy code:', error);
			toast.error('Failed to copy code to clipboard');
		}
	}

	// Cleanup timeout on component destroy
	onDestroy(() => {
		if (copyTimeout) {
			clearTimeout(copyTimeout);
			copyTimeout = null;
		}
	});
</script>

<!-- Fallback slot support -->
{#if !code}
	<div style="display: none;">
		<slot />
	</div>
{/if}

<div class="code-wrapper" class:default-expanded={defaultExpanded}>
	<section class={`code-container ${$$props.class || ''}`.trim()} aria-label="Code block">
		<div class="context">
			<span class="language-badge" aria-label="Language: {language}">{language}</span>
			<Button
				class="comments-toggle-button"
				onclick={toggleComments}
				title={showComments ? 'Hide comments' : 'Show comments'}
				aria-label={showComments ? 'Hide code comments' : 'Show code comments'}
				aria-pressed={showComments}
			>
				{#if showComments}
					<MessageSquareOff size={14} />
				{:else}
					<MessageSquare size={14} />
				{/if}
			</Button>
			<Button
				class="copy-button"
				onclick={copyCode}
				title={isCopied ? 'Copied!' : 'Copy to Clipboard'}
				aria-label={isCopied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
				aria-pressed={isCopied}
			>
				{#if isCopied}
					<Check size={14} />
				{:else}
					<Copy size={14} />
				{/if}
			</Button>
		</div>

		<pre
			class="code-pre text-sm"
			role="presentation"
			class:collapsed={lineCount > MAX_LINES_COLLAPSED && !isExpanded}
			class:expanded={lineCount > MAX_LINES_COLLAPSED && isExpanded}
			class:short-code={lineCount <= MAX_LINES_COLLAPSED}>
			<code class={`hljs ${language}`}>{@html highlightedCode}</code>
		</pre>
	</section>
	{#if lineCount > MAX_LINES_COLLAPSED}
		<div class="expand-container-bottom">
			<Button
				class="expand-button-bottom"
				onclick={toggleExpand}
				title={isExpanded ? 'Collapse code' : 'Show full code'}
				aria-label={isExpanded ? 'Collapse code' : 'Show full code'}
				aria-expanded={isExpanded}
			>
				{#if isExpanded}
					<ChevronUp size={16} />
					<span>Collapse</span>
				{:else}
					<ChevronDown size={16} />
					<span>Show full code</span>
				{/if}
			</Button>
		</div>
	{/if}
</div>

<style>
	.code-wrapper {
		position: relative;
		width: 100%;
	}

	.code-container {
		position: relative;
		width: 100%;
		max-width: 100%;
		padding: 0;
		margin: 0;
		overflow-x: auto;
		overflow-y: visible;
		box-sizing: border-box;
		min-width: 0; /* Allow container to shrink below content size */
		scrollbar-width: thin;
		scrollbar-color: rgba(203, 214, 226, 0.15) transparent;
		display: flex;
		flex-direction: column;
		border-radius: 0.5rem;
		background: #0b1c2c;
		/* Ensure content is not clipped */
		overflow-clip-margin: 0;
	}

	.context {
		position: absolute;
		top: 8px;
		right: 8px;
		z-index: 10;
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	/* Hide buttons on desktop by default, show on hover */
	@media (hover: hover) and (pointer: fine) {
		.code-wrapper .context {
			opacity: 0;
			transition: opacity 0.2s ease;
		}

		.code-wrapper:hover .context,
		.code-wrapper.default-expanded .context {
			opacity: 1;
		}

		.code-wrapper .expand-container-bottom {
			opacity: 0;
			transition: opacity 0.2s ease;
		}

		.code-wrapper:hover .expand-container-bottom,
		.code-wrapper.default-expanded .expand-container-bottom {
			opacity: 1;
		}
	}

	.language-badge {
		display: inline-flex;
		height: 1.75rem;
		align-items: center;
		border-radius: 0.375rem;
		padding: 0 0.5rem;
		font-size: 0.625rem;
		font-weight: 500;
		text-transform: uppercase;
		background: white;
		color: black;
	}

	:global(.comments-toggle-button),
	:global(.copy-button) {
		height: 1.75rem !important;
		width: 1.75rem !important;
		font-size: 0.75rem !important;
		background: white !important;
		color: black !important;
		border: none !important;
		cursor: pointer !important;
		transition:
			opacity 0.2s ease,
			transform 0.2s ease !important;
	}

	:global(.comments-toggle-button:hover),
	:global(.copy-button:hover) {
		opacity: 0.8 !important;
		transform: scale(1.05) !important;
	}

	:global(.comments-toggle-button:active),
	:global(.copy-button:active) {
		transform: scale(0.95) !important;
	}

	:global(.comments-toggle-button svg),
	:global(.copy-button svg) {
		color: black !important;
		transition:
			opacity 0.2s ease,
			transform 0.2s ease !important;
	}

	.code-pre {
		position: static;
		margin: 0 !important;
		padding: 1.5rem 0 calc(1.5rem + 2.5rem) 0 !important;
		overflow-x: auto;
		overflow-y: auto;
		border-radius: 0;
		transition: max-height 0.3s ease;
		line-height: 0; /* Reset line-height on pre to prevent extra spacing */
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
		min-width: 0; /* Allow pre to shrink below content size */
		background: transparent !important;
		flex-shrink: 0;
		/* Ensure content is not clipped */
		overflow-clip-margin: 0;
	}

	/* Remove max-height for code blocks with 25 lines or less */
	.code-pre:not(.collapsed):not(.expanded) {
		max-height: none !important;
	}

	/* Reduce padding for short code blocks to minimize empty space */
	.code-pre.short-code {
		padding-bottom: 1.5rem !important;
	}

	.code-pre.collapsed {
		max-height: calc(
			0.75rem * 1.75 * 25 + 1.5rem
		); /* Exactly 25 lines (font-size * line-height) + top padding */
		overflow-y: hidden;
		position: relative;
	}

	.code-pre.collapsed::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 4rem;
		background: linear-gradient(to bottom, transparent, #0b1c2c);
		pointer-events: none;
	}

	.code-pre.expanded {
		max-height: none;
	}

	.expand-container-bottom {
		position: absolute;
		bottom: 18px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10;
		pointer-events: none;
		width: max-content;
	}

	.expand-container-bottom :global(button) {
		pointer-events: auto;
	}

	:global(.expand-button-bottom) {
		display: inline-flex !important;
		align-items: center !important;
		gap: 0.5rem !important;
		height: auto !important;
		width: auto !important;
		padding: 0.5rem 1rem !important;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif,
			'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol' !important;
		font-size: 0.75rem !important;
		font-weight: 500 !important;
		background: white !important;
		color: black !important;
		opacity: 1 !important;
		border: none !important;
		border-radius: 0.375rem !important;
		cursor: pointer !important;
		transition:
			transform 0.2s ease,
			background 0.2s ease !important;
	}

	:global(.expand-button-bottom:hover) {
		transform: translateY(-1px) !important;
	}

	:global(.expand-button-bottom:active) {
		transform: translateY(0) !important;
	}

	:global(.expand-button-bottom svg) {
		color: black !important;
	}

	.code-pre code {
		padding: 0 1.5rem !important;
		margin: 0 !important;
		background: transparent !important;
		font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.75rem;
		line-height: 1.75;
		white-space: pre;
		word-wrap: normal;
		word-break: normal;
		display: block;
		tab-size: 2;
		overflow-x: visible;
		overflow-y: visible;
		/* Ensure text is not clipped */
		text-overflow: clip;
		min-width: max-content;
	}

	/* Ensure highlight.js themes apply properly */
	.code-pre code.hljs {
		background: transparent !important;
	}

	/* Custom comment styling */
	.code-pre code :global(.hljs-comment),
	.code-pre code :global(.hljs-quote) {
		color: #888888 !important;
		font-style: italic;
		opacity: 0.6;
	}

	/* Comments are now removed from the code, not just hidden */

	/* Scrollbar styling - horizontal and vertical */
	.code-container::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	.code-container::-webkit-scrollbar-track {
		background: transparent;
	}

	.code-container::-webkit-scrollbar-thumb {
		border-radius: 0;
		background: rgba(203, 214, 226, 0.15);
	}

	.code-container::-webkit-scrollbar-thumb:hover {
		background: rgba(203, 214, 226, 0.25);
	}

	.code-container::-webkit-scrollbar-corner {
		background: transparent;
	}
</style>
