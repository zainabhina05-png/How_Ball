'use client';

import React from 'react';
import styles from '@/components/ui/UI.module.css';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  contextLost: boolean;
}

/**
 * Wraps the R3F <Canvas> with:
 * 1. A React error boundary that catches render crashes / missing WebGL support.
 * 2. A `webglcontextlost` window listener for mobile GPU memory reclamation
 *    (common on Safari iOS — it terminates WebGL contexts to free RAM).
 *
 * Both cases render the same friendly fallback panel instead of a blank/frozen screen.
 */
export default class CanvasErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, contextLost: false };
    this.handleContextLost = this.handleContextLost.bind(this);
  }

  // ─── React error boundary ─────────────────────────────────────────────────

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.warn('[CanvasErrorBoundary] WebGL/render error:', error.message, info.componentStack);
  }

  // ─── WebGL context loss ───────────────────────────────────────────────────

  handleContextLost(event: Event) {
    event.preventDefault();
    console.warn('[CanvasErrorBoundary] WebGL context lost — showing fallback.');
    this.setState({ contextLost: true });
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('webglcontextlost', this.handleContextLost);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('webglcontextlost', this.handleContextLost);
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  render() {
    if (this.state.hasError || this.state.contextLost) {
      return (
        <div className={styles.overlay} style={{ pointerEvents: 'auto' }}>
          <div className={styles.glassPanel}>
            <h1 className={styles.title} style={{ fontSize: '2rem' }}>
              {this.state.contextLost ? '⚠️ Graphics Interrupted' : '⚠️ Failed to Load'}
            </h1>
            <p className={styles.subtitle} style={{ marginBottom: '20px' }}>
              {this.state.contextLost
                ? 'Your device reclaimed GPU memory. Please refresh to continue.'
                : "Something went wrong loading the 3D scene. Your browser or device may not support WebGL."}
            </p>
            <button
              className={styles.button}
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
