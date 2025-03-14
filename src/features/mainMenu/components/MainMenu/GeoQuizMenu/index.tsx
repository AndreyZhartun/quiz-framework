import { memo } from "react";
import { SupportedDataConfigs } from "../../../../../reducer/constants";
import DataLoadMenu from "../DataLoadMenu";

/**
 * Меню выбора квиза по географии
 */
const GeoQuizMenu: React.FC = () => {

  return <DataLoadMenu
    config={SupportedDataConfigs.Geography}
  />
}

export default memo(GeoQuizMenu);
