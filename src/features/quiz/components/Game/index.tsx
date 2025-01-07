import { useContext, useEffect } from "react";
import { GameProps } from "./types";
import { GameStatuses } from "../../reducer/constants";
import QuestionView from "../QuestionView";
import { loadDataAction } from "../../reducer/actions";
import GameContext from "../../context/gameContext";
import MainMenu from "../MainMenu";

const Game: React.FC<GameProps> = ({
  countries,
}) => {

  const {
    state,
    dispatch,
  } = useContext(GameContext);

  useEffect(() => {
    dispatch(loadDataAction(countries));
  }, [dispatch, countries])

  const {
    status,
  } = state;
  
  if (status === GameStatuses.Stopped) {
    return <MainMenu/>
  }

  return <div>
    <QuestionView />
  </div>
}

export default Game;