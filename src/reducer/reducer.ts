import { GAME_QUESTION_LIMIT } from "../constants/globalConstants";
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
  type: QuizActionTypes.RecordAnswer;
  payload: {
    givenAnswerId: string;
  }
} | {
  type: QuizActionTypes.ProcessQuestionChange;
}

export const initialState: QuizState = {
  data: [],
  status: GameStatuses.Initial,
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
    /**
     * Записать ответ пользователя на вопрос
     */
    case QuizActionTypes.RecordAnswer:

      if (!state.current) {
        return state;
      }

      return {
        ...state,
        answeredQuestions: [
          ...state.answeredQuestions,
          {
            question: state.current,
            givenAnswerId: action.payload.givenAnswerId,
          },
        ]
      }
    /**
     * Обработать изменение текущего вопроса
     */
    case QuizActionTypes.ProcessQuestionChange:

      if (state.answeredQuestions.length + 1 === GAME_QUESTION_LIMIT) {
        return {
          ...state,
          current: null,
          status: GameStatuses.Finished,
        }
      }

      /**
       * Если в очереди нет вопросов, но игра еще не завершена, то показать ошибку в консоли,
       * потому что такое состояние не должно возникать
       */
      if (!state.queue.length) {
        console.error("В очереди вопросов пусто, но игра еще не завершена");
        return state;
      }

      /**
       * Нужно ли добавлять новые вопросы в очередь
       */
      const shouldRefillQueue = state.answeredQuestions.length + state.queue.length < GAME_QUESTION_LIMIT;

      return {
        ...state,
        current: state.queue[0],
        queue: shouldRefillQueue 
          ? [...state.queue.slice(1), generateQuestion(state.data)] 
          : state.queue.slice(1),
      }
    default:
      return state;
  }
}

export default quizReducer;