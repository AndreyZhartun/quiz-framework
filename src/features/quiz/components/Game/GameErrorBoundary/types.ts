import { PropsWithChildren } from "react";

export type GameErrorBoundaryProps = PropsWithChildren;

export type GameErrorBoundaryState = {
  hasError: boolean;
}