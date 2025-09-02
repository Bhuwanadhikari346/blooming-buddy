"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
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

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            style={{
              padding: "3rem 2rem",
              textAlign: "center",
              background: "#fff2f0",
              border: "1px solid #ffccc7",
              borderRadius: "var(--border-radius)",
              margin: "2rem auto",
              maxWidth: "600px",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌿💔</div>
            <h2 style={{ color: "#a8071a", marginBottom: "1rem" }}>
              Oops! Something went wrong
            </h2>
            <p style={{ color: "#595959", marginBottom: "1.5rem" }}>
              We encountered an error while loading this page. Our plants are usually better behaved!
            </p>
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              🔄 Try Again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}