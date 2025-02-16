import React from "react";
import { QuizAction } from "./reducer";
import { QuizActionTypes } from "./constants";

/**
 * Тип действия reducer-а с middleware (по аналогии с redux-thunk)
 */
export type MiddlewareLikeAction = (dispatch: React.Dispatch<QuizAction>) => void;

export const loadDataAction = (
  data: Record<string, string>[]
): MiddlewareLikeAction => dispatch => {
  dispatch({
    type: QuizActionTypes.LoadData,
    payload: {
      data,
    }
  })
}

export const generateStartingQuestions = (): MiddlewareLikeAction => dispatch => {
  dispatch({
    type: QuizActionTypes.GenerateStartingQuestions,
  })
}

export const startGameAction = (): MiddlewareLikeAction => dispatch => {
  dispatch({
    type: QuizActionTypes.StartGame,
  })
}

export const processAnswerAction = (
  givenAnswerId: string,
): MiddlewareLikeAction => dispatch => {

  dispatch({
    type: QuizActionTypes.RecordAnswer,
    payload: {
      givenAnswerId,
    }
  })

  dispatch({
    type: QuizActionTypes.ProcessQuestionChange,
  })
}