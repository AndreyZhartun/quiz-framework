import Country from "../features/quiz/models/Country";
import Question, { AnsweredQuestion } from '../features/quiz/models/Question';
import generateQuestion from "../features/quiz/utils/generateQuestion";
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
  type: QuizActionTypes.GenerateStartingQuestions;
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
    /**
     * Загрузить данные в состояние reducer-а
     */
    case QuizActionTypes.LoadData:
      return {
        ...state,
        data: action.payload.countries,
      }
    /**
     * Создать начальные вопросы
     */
    case QuizActionTypes.GenerateStartingQuestions:
      return {
        ...state,
        current: generateQuestion(state.data),
        queue: Array(4).fill(0).map(() => generateQuestion(state.data)),
      }
    /**
     * Начать игру
     */
    case QuizActionTypes.StartGame:
      return {
        ...state,
        status: GameStatuses.Ongoing,
      }
    case QuizActionTypes.ProcessAnswer:

      if (!state.current) {
        return state;
      }

      return {
        ...state,
        current: state.queue[0],
        queue: [...state.queue.slice(1), generateQuestion(state.data)],
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