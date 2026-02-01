/**
 * Throttles a function to only execute once per specified delay period.
 * Useful for performance optimization of frequently-fired events like scroll or resize.
 *
 * @param func - The function to throttle
 * @param delay - Minimum time between function executions in milliseconds
 * @returns Throttled version of the function
 *
 * @example
 * const handleScroll = throttle(() => {
 *   console.log('Scrolled!');
 * }, 100); // Will only log at most once per 100ms
 */
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastRun = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  return function throttled(...args: Parameters<T>) {
    const now = Date.now();

    // Clear any pending timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    // If enough time has passed since last execution, run immediately
    if (now - lastRun >= delay) {
      lastRun = now;
      func(...args);
    } else {
      // Otherwise, schedule to run after the delay
      timeoutId = setTimeout(() => {
        lastRun = Date.now();
        func(...args);
        timeoutId = null;
      }, delay - (now - lastRun));
    }
  };
}

/**
 * Formats phone number for tel: links by removing all non-digit characters
 * and adding +1 country code for US numbers.
 *
 * @param phone - Phone number string (e.g., "(212) 263-0000")
 * @returns Clean phone number for tel: link (e.g., "+12122630000")
 *
 * @example
 * formatPhoneForLink("(212) 263-0000") // Returns "+12122630000"
 */
export function formatPhoneForLink(phone: string): string {
  if (!phone || typeof phone !== "string") {
    console.warn("Invalid phone number provided to formatPhoneForLink");
    return "";
  }

  const cleaned = phone.replace(/\D/g, "");
  if (!cleaned) return "";

  // If number already starts with 1 and is 11 digits, just add +
  if (cleaned.startsWith("1") && cleaned.length === 11) {
    return `+${cleaned}`;
  }

  // Otherwise add +1 country code
  return `+1${cleaned}`;
}

/**
 * Validates that a phone number has the expected format.
 *
 * @param phone - Phone number string to validate
 * @returns True if phone appears to be a valid US phone number
 *
 * @example
 * isValidPhone("(212) 263-0000") // Returns true
 * isValidPhone("123") // Returns false
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== "string") return false;
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 10 && cleaned.length <= 11;
}

/**
 * Generates a stable React key for list items by combining index and content preview.
 * More stable than index-only keys when list can be reordered, but simpler than
 * relying solely on content which may not be unique.
 *
 * @param prefix - Key prefix to namespace the key (e.g., "subtitle", "left-item")
 * @param index - Array index
 * @param content - Text content for additional uniqueness
 * @param previewLength - Number of characters to include in preview (default: 20)
 * @returns Stable key string
 *
 * @example
 * generateListKey("subtitle", 0, "Welcome to our site", 20)
 * // Returns "subtitle-0-Welcome-to-our-site"
 */
export function generateListKey(
  prefix: string,
  index: number,
  content: string,
  previewLength: number = 30
): string {
  const preview = content
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, previewLength);
  return `${prefix}-${index}-${preview}`;
}
