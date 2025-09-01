import { memo } from "react";
import QuestionView from "../QuestionView";
import GameErrorBoundary from "./GameErrorBoundary";

/**
 * Ongoing game container
 */
const GameInProgress: React.FC = () => {
  return <GameErrorBoundary>
    <QuestionView />
  </GameErrorBoundary>
}

export default memo(GameInProgress);