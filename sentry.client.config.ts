import * as Sentry from "@sentry/nextjs";

/**
 * Sentry Client-Side Configuration
 *
 * This configuration is used for error tracking in the browser.
 * Errors are only sent to Sentry in production builds.
 */

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const SENTRY_ENVIRONMENT = process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || "production";

// Only initialize Sentry if DSN is configured
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENVIRONMENT,

    // Performance monitoring - adjust sample rate as needed
    tracesSampleRate: 0.1, // 10% of transactions for performance monitoring

    // Session Replay - captures user interactions for debugging
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

    // Don't send errors in development
    enabled: process.env.NODE_ENV === "production",

    // Ignore common browser errors that aren't actionable
    ignoreErrors: [
      // Browser extension errors
      "top.GLOBALS",
      "originalCreateNotification",
      "canvas.contentDocument",
      "MyApp_RemoveAllHighlights",
      "atomicFindClose",
      // Network errors
      "Non-Error promise rejection captured",
      "Network request failed",
      // Safari-specific
      "Can't find variable: ZiteReader",
      "jigsaw is not defined",
      "ComboSearch is not defined",
    ],

    beforeSend(event, hint) {
      // Filter out errors from browser extensions
      if (event.exception?.values?.[0]?.stacktrace?.frames) {
        const frames = event.exception.values[0].stacktrace.frames;
        if (frames.some((frame) => frame.filename?.includes("extension://"))) {
          return null;
        }
      }
      return event;
    },
  });
}
