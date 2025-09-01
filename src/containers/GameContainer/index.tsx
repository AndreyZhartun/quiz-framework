import React, { memo, useContext } from "react";
import GameInProgress from "../../features/quiz/components/GameInProgress";
import MainMenu from "../../features/mainMenu/components/MainMenu";
import GameContext from "../../context/gameContext";
import StartGameButton from "../../features/mainMenu/components/StartGameButton";
import { GameStatuses } from "../../reducer/constants";
import ProgressMenu from "../../features/quiz/components/ProgressMenu";
import { Callout } from "@blueprintjs/core";
import ResultsView from "../../features/results/components/ResultsView";

/**
 * A wrapper container for all game states
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
     * Before game start
     */
    case GameStatuses.Initial:
      return <>
        <MainMenu/>
        <StartGameButton/>
      </>
    /**
     * Ongoing game
     */
    case GameStatuses.Ongoing:
      return <>
        <ProgressMenu/>
        <GameInProgress/>
      </>
    /**
     * After game end
     */
    case GameStatuses.Finished:
      return <>
        <ResultsView/>
      </>
    default:
      return <>
        <Callout intent="danger">
          Unknown game status
        </Callout>
      </>
  }
}

export default memo(GameContainer);