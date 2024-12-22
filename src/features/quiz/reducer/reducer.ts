import Country from "../models/Country";
import Question, { AnsweredQuestion } from '../models/Question';
import generateQuestion from "../utils/generateQuestion";
import { GameStatuses, QuizActionTypes } from "./constants";

export type QuizState = {
    /** данные, по которым составляются вопросы */
    data: Country[];
    /** статус игры */
    status: GameStatuses;
    /** текущий вопрос */
    current: Question | null;
    /** очередь следующих вопросов */
    queue: Question[];
    /** список вопросов, на которые был дан ответ */
    answeredQuestions: AnsweredQuestion[];
}

export type QuizAction = {
    type: QuizActionTypes.LoadData;
    payload: {
        countries: Country[];
    }
} | {
    type: QuizActionTypes.StartGame;
} | {
    type: QuizActionTypes.ProcessAnswer;
    payload: {
        givenAnswerId: string;
    }
}

export const initialState: QuizState = {
    data: [],
    status: GameStatuses.Stopped,
    current: null,
    queue: [],
    answeredQuestions: [],
}

function quizReducer(
    state: QuizState,
    action: QuizAction,
): QuizState {
    switch (action.type) {
        case QuizActionTypes.LoadData:
            return {
                ...state,
                data: action.payload.countries,
            }
        case QuizActionTypes.StartGame:
            return {
                ...state,
                status: GameStatuses.Ongoing,
                current: generateQuestion(state.data),
                queue: Array(4).fill(0).map(() => generateQuestion(state.data)),
            }
        case QuizActionTypes.ProcessAnswer:

            if (!state.current) {
                return state;
            }

            return {
                ...state,
                current: state.queue[0],
                queue: [...state.queue.slice(1)],
                answeredQuestions: [
                    ...state.answeredQuestions,
                    {
                        question: state.current,
                        givenAnswerId: action.payload.givenAnswerId,
                    },
                ]
            }
        default:
            return state;
    }
}

export default quizReducer;