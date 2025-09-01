import { createContext } from "react";
import { MiddlewareLikeAction } from "../reducer/actions";
import { initialState, QuizState } from "../reducer/reducer";

export type GameContextType = {
  state: QuizState;
  dispatch: (action: MiddlewareLikeAction) => void;
}

/**
 * A context containing all the global game state and an action function
 * @see App - redux context imitation
 */
const GameContext = createContext<GameContextType>({
  state: initialState,
  dispatch: () => undefined,
});

export default GameContext;