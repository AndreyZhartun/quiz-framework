/**
 * Reducer action types
 */
export enum QuizActionTypes {
  LoadData = "LOAD_DATA",
  GenerateStartingQuestions = "GENERATE_STARTING_QUESTIONS",
  StartGame = "START_GAME",
  RecordAnswer = "RECORD_ANSWER",
  ProcessQuestionChange = "PROCESS_QUESTION_CHANGE",
  ProcessAnswer = "PROCESS_ANSWER",
}

/**
 * Game statuses
 */
export enum GameStatuses {
  Initial = "INITIAL",
  Ongoing = "ONGOING",
  Finished = "FINISHED",
}

/**
 * Supported data sources
 */
export enum SupportedDataConfigs {
  Geography = "GEOGRAPHY",
}

export type GameDataDictionary<T extends Record<string, string>> = Map<string, T>