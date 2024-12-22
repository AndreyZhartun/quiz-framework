import React, { useCallback, useMemo, useReducer } from "react";
import { useQuery, gql } from '@apollo/client';
import Country from "../../models/Country";
import Game from "../../components/Game";
import GameContext, { GameContextType } from "../../context/gameContext";
import { MiddlewareLikeAction } from "../../reducer/actions";
import quizReducer, { initialState } from "../../reducer/reducer";

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      capital
      emoji
    }
  }
`;

type CountriesQueryResult = {
  countries: Country[];
}

const GameContainer: React.FC = () => {

    const {
        data,
        loading,
        error,
    } = useQuery<CountriesQueryResult>(GET_COUNTRIES);
  
  
    /**
     * Для управления состояниями игры нужно хранить много различных переменных.
     * Так что используется встроенный в React reducer
     */
    const [state, pureDispatch] = useReducer(quizReducer, initialState)

    /**
     * Чтобы не прописывать type в действии каждый раз, можно создать набор функций, 
     * которые и будут генерировать действия reducer-а при их вызове.
     * По сути здесь имитируется принцип middleware в Redux, а именно redux-thunk.
     */
    const dispatch = useCallback((action: MiddlewareLikeAction) => {
        action(pureDispatch);
    }, [pureDispatch]);

    const gameContextValue = useMemo<GameContextType>(() => ({
        state,
        dispatch,
    }), [state, dispatch]);

    if (loading) { 
        return <p>Загрузка...</p>
    }

    if (error) { 
        return <p>Ошибка: {error.message}</p>
    }

    if (!data) {
        return <p>
            Нет данных
        </p>
    }

    return <GameContext.Provider value={gameContextValue}>
        <Game countries={data.countries}/>
    </GameContext.Provider>
}

export default GameContainer;