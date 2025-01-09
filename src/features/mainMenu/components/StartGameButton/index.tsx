import { useCallback, useContext, useMemo } from "react";
import GameContext from "../../../../context/gameContext";
import { startGameAction } from "../../../../reducer/actions";
import { Card, CardProps } from "@blueprintjs/core";
import useDispatch from "../../../../hooks/useDispatch";

/**
 * Кнопка начала игры
 */
const StartGameButton = () => {

  const dispatch = useDispatch();

  const {
    state,
  } = useContext(GameContext);

  const {
    data,
  } = state;

  const canStart = !!data.length;

  const startGame = useCallback(() => {
    dispatch(startGameAction());
  }, [dispatch])

  const buttonProps = useMemo<CardProps>(() => {
    if (!canStart) {
      return {
        
      }
    }

    return {
      interactive: true,
      onClick: startGame,
    }
  }, [canStart, startGame])

  return <>
    <Card {...buttonProps}>
      Начать игру
    </Card>
  </>
}

export default StartGameButton;