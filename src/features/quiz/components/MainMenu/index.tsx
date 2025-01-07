import { useCallback, useContext } from "react";
import GameContext from "../../context/gameContext";
import { startGameAction } from "../../reducer/actions";
import { Card } from "@blueprintjs/core";

const MainMenu = () => {

  const {
    dispatch,
  } = useContext(GameContext);

  const startGame = useCallback(() => {
    dispatch(startGameAction());
  }, [dispatch])

  return <>
    <Card interactive onClick={startGame}>
      Начать игру
    </Card>
  </>
}

export default MainMenu;