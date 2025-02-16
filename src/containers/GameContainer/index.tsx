import React, { useContext } from "react";
import GameInProgress from "../../features/quiz/components/GameInProgress";
import MainMenu from "../../features/mainMenu/components/MainMenu";
import GameContext from "../../context/gameContext";
import StartGameButton from "../../features/mainMenu/components/StartGameButton";
import { GameStatuses } from "../../reducer/constants";
import ProgressMenu from "../../features/quiz/components/ProgressMenu";
import { Callout } from "@blueprintjs/core";
import ResultsView from "../../features/results/components/ResultsView";

/**
 * Контейнер-обертка всех состояний игры
 */
const GameContainer: React.FC = () => {

  const {
    state,
  } = useContext(GameContext);

  const {
    status,
  } = state;

  switch (status) {
    /**
     * Состояние перед началом игры
     */
    case GameStatuses.Initial:
      return <>
        <MainMenu/>
        <StartGameButton/>
      </>
    /**
     * Состояние в процессе игры
     */
    case GameStatuses.Ongoing:
      return <>
        <ProgressMenu/>
        <GameInProgress/>
      </>
    /**
     * Состояние после окончания игры
     */
    case GameStatuses.Finished:
      return <>
        <ResultsView/>
      </>
    default:
      return <>
        <Callout intent="danger">
          Неизвестная ошибка
        </Callout>
      </>
  }
}

export default GameContainer;