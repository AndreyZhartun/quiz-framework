import { useContext } from "react";
import GameContext from "../context/gameContext";

/**
 * Хук useDispatch, как в Redux.
 * Работает только внутри контекста GameContext.
 */
const useDispatch = () => {

  const {
    dispatch,
  } = useContext(GameContext);

  return dispatch;
}

export default useDispatch;