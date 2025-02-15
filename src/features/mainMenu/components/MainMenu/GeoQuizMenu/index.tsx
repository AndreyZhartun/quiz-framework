import DataLoadMenu from "../DataLoadMenu";
import { SupportedDataConfigs } from "../DataLoadMenu/types";

/**
 * Меню выбора квиза по географии
 */
const GeoQuizMenu: React.FC = () => {

  return <DataLoadMenu
    config={SupportedDataConfigs.Geography}
  />
}

export default GeoQuizMenu;
