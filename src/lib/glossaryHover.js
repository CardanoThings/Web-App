// src/lib/actions/glossaryHover.js
import { get } from "svelte/store";
import { glossary } from "$stores/glossary";

export function glossaryHover(node, params = { delay: 1000 }) {
    let popover;
    let hoverTimeout = null;
    let lastWord = null;
    let delay = params && typeof params.delay === 'number' ? params.delay : 1000;

    function onMouseOver(e) {
        const selection = window.getSelection();
        selection.removeAllRanges();

        // Find the word under the mouse
        const range = document.caretRangeFromPoint
            ? document.caretRangeFromPoint(e.clientX, e.clientY)
            : document.caretPositionFromPoint
                ? (() => {
                    const pos = document.caretPositionFromPoint(e.clientX, e.clientY);
                    if (!pos) return null;
                    const r = document.createRange();
                    r.setStart(pos.offsetNode, pos.offset);
                    r.setEnd(pos.offsetNode, pos.offset);
                    return r;
                })()
                : null;

        if (!range) return;

        // Expand range to word boundaries
        if (range.expand) {
            range.expand("word");
        }
        let word = range.toString();
        if (!word) {
            // fallback: try to get word manually
            const text = range.startContainer.textContent;
            const offset = range.startOffset;
            const left = text.slice(0, offset).search(/\S+$/);
            const right = text.slice(offset).search(/\s/);
            word = text.slice(left, right < 0 ? undefined : offset + right);
        }
        word = word.trim();

        const glossaryArr = get(glossary);
        // Flatten array of objects into a single object for lookup
        const terms = Object.assign({}, ...glossaryArr);
        if (terms[word]) {
            if (lastWord !== word) {
                clearTimeout(hoverTimeout);
                hidePopover();
                hoverTimeout = setTimeout(() => {
                    showPopover(e, word, terms[word]);
                }, delay);
                lastWord = word;
            }
        } else {
            clearTimeout(hoverTimeout);
            hidePopover();
            lastWord = null;
        }
    }

    function showPopover(e, word, definition) {
        hidePopover();
        popover = document.createElement("div");
        popover.className =
            "fixed z-50 p-2 bg-white border rounded shadow w-60 text-sm text-black opacity-0 transition-opacity duration-600 pointer-events-none";
        popover.style.left = e.pageX + 0 + "px";
        popover.style.top = e.pageY + 0 + "px";
        popover.innerHTML = `<strong>${word}</strong><br>${definition}`;
        document.body.appendChild(popover);
        // Fade in
        setTimeout(() => {
            if (popover) popover.style.opacity = "1";
        }, 10);
    }

    function hidePopover() {
        if (popover) {
            popover.style.opacity = "0";
            // Wait for fade-out before removing
            setTimeout(() => {
                if (popover) {
                    popover.remove();
                    popover = null;
                }
            }, 300);
        }
    }

    node.addEventListener("mousemove", onMouseOver);
    node.addEventListener("mouseleave", () => {
        clearTimeout(hoverTimeout);
        hidePopover();
        lastWord = null;
    });

    return {
        update(newParams) {
            delay = newParams && typeof newParams.delay === 'number' ? newParams.delay : 1000;
        },
        destroy() {
            node.removeEventListener("mousemove", onMouseOver);
            node.removeEventListener("mouseleave", hidePopover);
            clearTimeout(hoverTimeout);
            hidePopover();
        }
    };
}