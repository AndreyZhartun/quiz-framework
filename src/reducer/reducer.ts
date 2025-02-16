import { GAME_QUESTION_LIMIT } from "../constants/globalConstants";
import Country from "../features/quiz/models/Country";
import Question, { AnsweredQuestion } from '../features/quiz/models/Question';
import generateMultipleQuestions from "../features/quiz/utils/generateMultipleQuestions";
import generateQuestion from "../features/quiz/utils/generateQuestion";
import getGameDataDict from "../utils/getGameDataDict";
import { GameDataDictionary, GameStatuses, QuizActionTypes, SupportedDataConfigs } from "./constants";

export type QuizState = {
  config: SupportedDataConfigs;
  /** данные, по которым составляются вопросы, в форме справочника */
  dataDict: GameDataDictionary<Record<string, string>>;
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
  config: SupportedDataConfigs.Geography,
  dataDict: new Map(),
  status: GameStatuses.Initial,
  current: null,
  queue: [],
  answeredQuestions: [],
}

/**
 * Главный и единственный обработчик изменений глобального состояния
 */
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
        dataDict: getGameDataDict(action.payload.countries),
      }
    /**
     * Создать начальные вопросы
     */
    case QuizActionTypes.GenerateStartingQuestions: {

      const [current, ...queue] = generateMultipleQuestions({
        count: 5,
        generateParams: {
          config: state.config,
          dataDict: state.dataDict,
        },
      })

      return {
        ...state,
        current,
        queue,
      }
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

      /**
       * Завершить игру, если количество отвеченных вопросов достигло лимита
       */
      if (state.answeredQuestions.length === GAME_QUESTION_LIMIT) {
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
          ? [...state.queue.slice(1), generateQuestion({config: state.config, dataDict: state.dataDict})] 
          : state.queue.slice(1),
      }
    default:
      return state;
  }
}

export default quizReducer;