import GameContainer from "../../features/quiz/containers/GameContainer";
import Sidebar from "../Sidebar";
import styles from "./Layout.module.scss";

const Layout: React.FC = () => {
    return <div className={styles['layout']}>
        <Sidebar/>
        <GameContainer/>
    </div>
}

export default Layout;