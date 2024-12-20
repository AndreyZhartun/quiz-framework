import Country from "../models/Country";
import Question, { AnsweredQuestion } from '../models/Question';
import generateQuestion from "../utils/generateQuestion";
import { QuizActionTypes } from "./constants";

export type QuizState = {
    current: Question | null;
    queue: Question[];
    answeredQuestions: AnsweredQuestion[];
}

export type QuizAction = {
    type: QuizActionTypes.Init;
    payload: {
        countries: Country[];
    }
} | {
    type: QuizActionTypes.ProcessAnswer;
    payload: {
        givenAnswerId: string;
    }
}

export const initialState: QuizState = {
    current: null,
    queue: [],
    answeredQuestions: [],
}

function quizReducer(
    state: QuizState,
    action: QuizAction,
): QuizState {
    switch (action.type) {
        case QuizActionTypes.Init:
            return {
                current: generateQuestion(action.payload.countries),
                queue: Array(4).fill(0).map(() => generateQuestion(action.payload.countries)),
                answeredQuestions: [],
            }
        case QuizActionTypes.ProcessAnswer:

            if (!state.current) {
                return state;
            }

            return {
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