import React, { useContext } from "react";
import Game from "../../components/Game";
import MainMenu from "../../../../components/MainMenu";
import GameContext from "../../context/gameContext";
import StartGameButton from "../../components/StartGameButton";
import { GameStatuses } from "../../reducer/constants";
import ProgressMenu from "../../components/ProgressMenu";

/**
 * 
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