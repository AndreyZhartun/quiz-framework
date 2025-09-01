import Layout from '../Layout';
import { useCallback, useMemo, useReducer } from 'react';
import quizReducer, { initialState } from '../../reducer/reducer';
import { MiddlewareLikeAction } from '../../reducer/actions';
import GameContext, { GameContextType } from '../../context/gameContext';

function App() {

  /**
   * Built-in reducer to manage complex state
   */
  const [state, pureDispatch] = useReducer(quizReducer, initialState)

  /**
   * As an experiment, I tried to implement basic Redux middleware (like redux-thunk) using only built-in state tools
   */
  const dispatch = useCallback((action: MiddlewareLikeAction) => {
    action(pureDispatch);
  }, [pureDispatch]);

  const gameContextValue = useMemo<GameContextType>(() => ({
    state,
    dispatch,
  }), [state, dispatch]);
  
  return (
    <GameContext.Provider value={gameContextValue}>
      <Layout/>
    </GameContext.Provider>
  )
}

export default App
