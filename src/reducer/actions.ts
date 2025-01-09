import React from "react";
import { QuizAction } from "./reducer";
import Country from "../features/quiz/models/Country";
import { QuizActionTypes } from "./constants";

/**
 * Тип действия reducer-а с middleware (по аналогии с redux-thunk)
 */
export type MiddlewareLikeAction = (dispatch: React.Dispatch<QuizAction>) => void;

export const loadDataAction = (
  countries: Country[]
): MiddlewareLikeAction => dispatch => {
  dispatch({
    type: QuizActionTypes.LoadData,
    payload: {
      countries,
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
    type: QuizActionTypes.ProcessAnswer,
    payload: {
      givenAnswerId,
    }
  })
}