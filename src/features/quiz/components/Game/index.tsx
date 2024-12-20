import { useCallback, useEffect, useReducer } from "react";
import { GameProps } from "./types";
import quizReducer, { initialState } from "../../reducer/reducer";
import { QuizActionTypes } from "../../reducer/constants";
import QuestionView from "../QuestionView";

const Game: React.FC<GameProps> = ({
    countries,
}) => {

    const [state, dispatch] = useReducer(quizReducer, initialState)

    useEffect(() => {
        dispatch({
            type: QuizActionTypes.Init,
            payload: {
                countries,
            }
        })
    }, [dispatch, countries])

    const {
        current,
        queue,
    } = state;

    const processAnswer = useCallback((givenAnswerId: string) => {
        dispatch({
            type: QuizActionTypes.ProcessAnswer,
            payload: {
                givenAnswerId,
            }
        })
    }, [])

    if (!current) {
        return <>Загрузка...</>
    }

    return <div>
        <QuestionView 
            question={current}
            processAnswer={processAnswer}
        />
    </div>
}

export default Game;