import { SupportedDataConfigs } from "../../../../../reducer/constants";

export type DataLoadMenuProps = {
  config: SupportedDataConfigs;
}

export type DataLoadConfig = {
  title: string;
  techs: string[];
  linkHref: string;
  linkLabel: string;
}
