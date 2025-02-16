import QuestionView from "../QuestionView";
import GameErrorBoundary from "./GameErrorBoundary";

/**
 * Контейнер игры в процессе
 */
const GameInProgress: React.FC = () => {
  return <GameErrorBoundary>
    <QuestionView />
  </GameErrorBoundary>
}

export default GameInProgress;