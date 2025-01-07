import Layout from '../Layout';
import { useCallback, useMemo, useReducer } from 'react';
import quizReducer, { initialState } from '../../features/quiz/reducer/reducer';
import { MiddlewareLikeAction } from '../../features/quiz/reducer/actions';
import GameContext, { GameContextType } from '../../features/quiz/context/gameContext';

function App() {

  /**
   * Для управления состояниями игры нужно хранить много различных переменных.
   * Так что используется встроенный в React reducer
   */
  const [state, pureDispatch] = useReducer(quizReducer, initialState)

  /**
   * Чтобы не прописывать type в действии каждый раз, можно создать набор функций, 
   * которые и будут генерировать действия reducer-а при их вызове.
   * По сути здесь имитируется принцип Redux middleware (как в redux-thunk).
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
