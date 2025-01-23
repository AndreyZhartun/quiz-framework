import React, { ErrorInfo } from "react";
import { GameErrorBoundaryProps as Props, GameErrorBoundaryState as State } from "./types";
import { Callout } from "@blueprintjs/core";

/**
 * Граничный компонент для обработки ошибок игрового процесса
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
    console.error("Ошибка в игре:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Callout intent="danger">Возникла ошибка. Пожалуйста, перезагрузите страницу</Callout>
    }

    return this.props.children;
  }
}

export default GameErrorBoundary;