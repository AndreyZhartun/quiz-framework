import { memo } from "react";
import GameContainer from "../../containers/GameContainer";
import styles from "./Layout.module.scss";

/**
 * The layout that wraps the app
 */
const Layout: React.FC = () => {
  return <div className={styles['layout']}>
    <GameContainer/>
  </div>
}

export default memo(Layout);