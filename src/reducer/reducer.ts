import { GAME_QUESTION_LIMIT } from "../constants/globalConstants";
import Question, { AnsweredQuestion } from '../features/quiz/models/Question';
import generateMultipleQuestions from "../features/quiz/utils/generateMultipleQuestions";
import generateQuestion from "../features/quiz/utils/generateQuestion";
import getGameDataDict from "../utils/getGameDataDict";
import { GameDataDictionary, GameStatuses, QuizActionTypes, SupportedDataConfigs } from "./constants";

export type QuizState = {
  config: SupportedDataConfigs;
  /** data from which questions are compiled, in the form of a dict */
  dataDict: GameDataDictionary<Record<string, string>>;
  /** game status */
  status: GameStatuses;
  /** current question */
  current: Question | null;
  /** queue of next questions */
  queue: Question[];
  /** list of questions that have been answered */
  answeredQuestions: AnsweredQuestion[];
}

export type QuizAction = {
  type: QuizActionTypes.LoadData;
  payload: {
    data: Record<string, string>[];
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
 * The main and only handler for global state changes
 */
function quizReducer(
  state: QuizState,
  action: QuizAction,
): QuizState {
  switch (action.type) {
    /**
     * Load data into the reducer state
     */
    case QuizActionTypes.LoadData:
      return {
        ...state,
        dataDict: getGameDataDict({
          config: state.config,
          rawData: action.payload.data,
        }),
      }
    /**
     * Create initial questions
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
     * Start the game
     */
    case QuizActionTypes.StartGame:
      return {
        ...state,
        status: GameStatuses.Ongoing,
      }
    /**
     * Record user's answer
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
     * Process current question status change
     */
    case QuizActionTypes.ProcessQuestionChange: {

      /**
       * End the game if the number of answered questions reaches the limit
       */
      if (state.answeredQuestions.length === GAME_QUESTION_LIMIT) {
        return {
          ...state,
          current: null,
          status: GameStatuses.Finished,
        }
      }

      /**
       * If there are no questions in the queue, but the game is not finished yet, then show an error in the console,
       * because this state should not occur
       */
      if (!state.queue.length) {
        console.error("Error: The question queue is empty, but the game is not over yet");
        return state;
      }

      /**
       * true if new questions should be added to the queue
       */
      const shouldRefillQueue = state.answeredQuestions.length + state.queue.length < GAME_QUESTION_LIMIT;

      return {
        ...state,
        current: state.queue[0],
        queue: shouldRefillQueue 
          ? [...state.queue.slice(1), generateQuestion({config: state.config, dataDict: state.dataDict})] 
          : state.queue.slice(1),
      }
    }
    default:
      return state;
  }
}

export default quizReducer;