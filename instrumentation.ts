/**
 * Next.js Instrumentation
 *
 * This file is automatically loaded by Next.js before your application starts.
 * Use it to initialize monitoring and observability tools.
 *
 * See: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  // Only run instrumentation on the client side for static exports
  if (typeof window !== "undefined") {
    await import("./sentry.client.config");
  }
}
