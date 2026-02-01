/**
 * Creates a focus trap within a container element.
 * Traps Tab and Shift+Tab navigation within the container's focusable elements.
 *
 * @param container - The HTML element to trap focus within
 * @returns Cleanup function to remove the focus trap
 *
 * @example
 * const cleanup = createFocusTrap(menuElement);
 * // Later, when done:
 * cleanup();
 */
export function createFocusTrap(container: HTMLElement): () => void {
  const focusableSelector =
    'a[href], button:not([disabled]), textarea:not([disabled]), ' +
    'input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const focusableElements =
    container.querySelectorAll<HTMLElement>(focusableSelector);
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      // Shift+Tab: moving backwards
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      }
    } else {
      // Tab: moving forwards
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    }
  }

  container.addEventListener("keydown", handleKeyDown);

  return () => {
    container.removeEventListener("keydown", handleKeyDown);
  };
}
