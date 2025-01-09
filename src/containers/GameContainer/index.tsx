import React, { useContext } from "react";
import Game from "../../features/quiz/components/Game";
import MainMenu from "../../features/mainMenu/components/MainMenu";
import GameContext from "../../context/gameContext";
import StartGameButton from "../../features/mainMenu/components/StartGameButton";
import { GameStatuses } from "../../reducer/constants";
import ProgressMenu from "../../features/quiz/components/ProgressMenu";

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

  if (status === GameStatuses.Stopped) {
    return <>
      <MainMenu/>
      <StartGameButton/>
    </>
  }

  return <>
    <ProgressMenu/>
    <Game/>
  </>
}

export default GameContainer;