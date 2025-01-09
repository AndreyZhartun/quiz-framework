import { createContext } from "react";
import { MiddlewareLikeAction } from "../reducer/actions";
import { initialState, QuizState } from "../reducer/reducer";

export type GameContextType = {
  state: QuizState;
  dispatch: (action: MiddlewareLikeAction) => void;
}

/**
 * Контекст, содержащий всё глобальное состояние игры и функцию действия
 */
const GameContext = createContext<GameContextType>({
  state: initialState,
  dispatch: () => undefined,
});

export default GameContext;