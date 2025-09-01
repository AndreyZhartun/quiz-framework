import React, { ErrorInfo } from "react";
import { GameErrorBoundaryProps as Props, GameErrorBoundaryState as State } from "./types";
import { Callout } from "@blueprintjs/core";

/**
 * Boundary component for handling gameplay errors
 */
class GameErrorBoundary extends React.Component<Props, State> {

  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error) {
    return {
      hasError: true,
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Game error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Callout intent="danger">An error has occurred. Please reload the page.</Callout>
    }

    return this.props.children;
  }
}

export default GameErrorBoundary;