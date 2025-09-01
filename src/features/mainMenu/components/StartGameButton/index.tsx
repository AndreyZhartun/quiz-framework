import { useCallback, useContext, useMemo } from "react";
import GameContext from "../../../../context/gameContext";
import { startGameAction } from "../../../../reducer/actions";
import { Card, CardProps } from "@blueprintjs/core";
import useDispatch from "../../../../hooks/useDispatch";

/**
 * Button to start the game
 */
const StartGameButton = () => {

  const dispatch = useDispatch();

  const {
    state,
  } = useContext(GameContext);

  const {
    dataDict,
  } = state;

  const canStart = !!dataDict.size;

  const startGame = useCallback(() => {
    dispatch(startGameAction());
  }, [dispatch])

  const buttonProps = useMemo<CardProps>(() => {
    if (!canStart) {
      return {}
    }

    return {
      interactive: true,
      onClick: startGame,
    }
  }, [canStart, startGame])

  return <>
    <Card {...buttonProps}>
      Start the game
    </Card>
  </>
}

export default StartGameButton;