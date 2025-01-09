export enum QuizActionTypes {
  LoadData = "LOAD_DATA",
  GenerateStartingQuestions = "GENERATE_STARTING_QUESTIONS",
  StartGame = "START_GAME",
  Init = "INIT",
  ProcessAnswer = "PROCESS_ANSWER",
}

export enum GameStatuses {
  Stopped = "STOPPED",
  Ongoing = "ONGOING",
}