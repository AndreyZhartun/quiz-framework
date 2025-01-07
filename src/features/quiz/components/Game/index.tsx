import { useContext } from "react";
import { GameProps } from "./types";
import { GameStatuses } from "../../reducer/constants";
import QuestionView from "../QuestionView";
import GameContext from "../../context/gameContext";
import StartGameButton from "../StartGameButton";

const Game: React.FC<GameProps> = ({
  
}) => {

  const {
    state,
  } = useContext(GameContext);

  const {
    status,
  } = state;
  
  if (status === GameStatuses.Stopped) {
    return <StartGameButton/>
  }

  return <div>
    <QuestionView />
  </div>
}

export default Game;