/**
 * Safe wrapper for sessionStorage that handles Safari private mode
 * and other storage access errors gracefully.
 */

/**
 * Safely gets an item from sessionStorage.
 *
 * @param key - Storage key
 * @returns Value or null if not found/error
 *
 * @example
 * const hasSeenIntro = safeSessionGet("intro-seen");
 */
export function safeSessionGet(key: string): string | null {
  if (typeof window === "undefined") return null;

  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    console.warn(`SessionStorage getItem failed for key "${key}":`, error);
    return null;
  }
}

/**
 * Safely sets an item in sessionStorage.
 *
 * @param key - Storage key
 * @param value - Value to store
 * @returns True if successful, false otherwise
 *
 * @example
 * safeSessionSet("intro-seen", "1");
 */
export function safeSessionSet(key: string, value: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    sessionStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(`SessionStorage setItem failed for key "${key}":`, error);
    return false;
  }
}

/**
 * Safely removes an item from sessionStorage.
 *
 * @param key - Storage key
 *
 * @example
 * safeSessionRemove("intro-seen");
 */
export function safeSessionRemove(key: string): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.warn(`SessionStorage removeItem failed for key "${key}":`, error);
  }
}
