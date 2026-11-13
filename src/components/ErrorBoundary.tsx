import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Shown instead of the children if they fail to render. */
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  failed: boolean;
}

/**
 * Contains a rendering failure to one part of the page. Used around the 3D
 * hero: if WebGL fails on a visitor's device, they get the static artwork and
 * the rest of the site keeps working, instead of a blank page.
 *
 * Errors are deliberately not shown to visitors or sent anywhere.
 */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary] Falling back after render error:', error);
    }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
