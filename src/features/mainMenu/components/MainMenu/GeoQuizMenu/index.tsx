import { memo } from "react";
import { SupportedDataConfigs } from "../../../../../reducer/constants";
import DataLoadMenu from "../DataLoadMenu";

/**
 * Geography Quiz selection menu
 */
const GeoQuizMenu: React.FC = () => {

  return <DataLoadMenu
    config={SupportedDataConfigs.Geography}
  />
}

export default memo(GeoQuizMenu);
