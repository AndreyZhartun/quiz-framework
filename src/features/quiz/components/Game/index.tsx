import { GameProps } from "./types";
import QuestionView from "../QuestionView";
import GameErrorBoundary from "./GameErrorBoundary";

/**
 * Контейнер игры в процессе
 */
const GameInProgress: React.FC<GameProps> = ({
  
}) => {
  return <GameErrorBoundary>
    <QuestionView />
  </GameErrorBoundary>
}

export default GameInProgress;