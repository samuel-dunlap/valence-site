"use client";

import { Component, ReactNode } from "react";
import styles from "./ErrorBoundary.module.css";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);

    // Call optional error reporting callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Report to Sentry in production
    if (typeof window !== "undefined") {
      // Dynamically import Sentry to avoid SSR issues
      import("@sentry/nextjs").then((Sentry) => {
        Sentry.captureException(error, {
          contexts: {
            react: {
              componentStack: errorInfo.componentStack,
            },
          },
        });
      });
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.errorContainer}>
          <h2 className={styles.errorHeading}>Something went wrong</h2>
          <p className={styles.errorMessage}>
            We apologize for the inconvenience. Please refresh the page or
            contact support.
          </p>
          <button
            className={styles.errorButton}
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
