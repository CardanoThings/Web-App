import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

/**
 * Scroll a scrollable element to the top. Runs multiple times (microtask, rAF, timeout)
 * so it still wins after focus traps / scrollIntoView from dialog open.
 */
export function resetScrollableElementToTop(el) {
	if (!el) return;
	const run = () => {
		el.scrollTop = 0;
	};
	run();
	queueMicrotask(run);
	requestAnimationFrame(() => {
		run();
		requestAnimationFrame(run);
	});
	setTimeout(run, 0);
}

/**
 * Bits-ui focuses the first tabbable in the dialog. For long "How it works" bodies,
 * the first link or control can be far down, so the scroll container jumps to show it.
 * After calling preventDefault on onOpenAutoFocus, focus the close control without scrolling.
 */
export function focusDialogCloseWithoutScrolling(contentEl) {
	if (!contentEl) return;
	const closeBtn = contentEl.querySelector("[data-slot='dialog-close']");
	if (closeBtn && typeof closeBtn.focus === "function") {
		closeBtn.focus({ preventScroll: true });
	}
}
