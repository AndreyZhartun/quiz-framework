import { memo } from "react";
import GameContainer from "../../containers/GameContainer";
import styles from "./Layout.module.scss";

/**
 * Каркас вёрстки приложения
 */
const Layout: React.FC = () => {
  return <div className={styles['layout']}>
    <GameContainer/>
  </div>
}

export default memo(Layout);