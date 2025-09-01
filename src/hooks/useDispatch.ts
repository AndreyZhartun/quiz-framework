import { useContext } from "react";
import GameContext from "../context/gameContext";

/**
 * useDispatch hook, like in Redux.
 * Only works within the GameContext context.
 */
const useDispatch = () => {

  const {
    dispatch,
  } = useContext(GameContext);

  return dispatch;
}

export default useDispatch;