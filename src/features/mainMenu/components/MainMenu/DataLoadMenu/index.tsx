import { Card, Spinner } from "@blueprintjs/core";
import { DataLoadConfig, DataLoadMenuProps } from './types';
import TechList from "../TechList";
import { useEffect } from "react";
import useDispatch from "../../../../../hooks/useDispatch";
import { generateStartingQuestions, loadDataAction } from "../../../../../reducer/actions";
import useDataFetch from "../../../hooks/useDataFetch";
import { SupportedDataConfigs } from "../../../../../reducer/constants";
import styles from "./DataLoadMenu.module.scss";
import classNames from "classnames";

/**
 * Меню загрузки данных из указанного источника
 */
const DataLoadMenu: React.FC<DataLoadMenuProps> = ({
  config,
}) => {

  const dispatch = useDispatch();

  const {
    data,
    loading,
    error,
  } = useDataFetch(config);

  useEffect(() => {
    if (!data.length) {
      return;
    }

    dispatch(loadDataAction(data));
    dispatch(generateStartingQuestions());
  }, [dispatch, data]);
  
  const {
    title,
    techs,
    linkHref,
    linkLabel,
  } = dataConfigs[config];

  if (error) { 
    return <p>Ошибка: {error}</p>
  }

  return <Card compact className="d-flex justify-content-between">
    <div>
      <h3 className="mb-1">{title}</h3>
      <div className={classNames("mb-3", styles['desc'])}>
        <TechList techs={techs}/>
        <a href={linkHref} target="_blank" rel="noopener" className="mt-1 mt-xs-0 ml-0 ml-xs-1">
          {linkLabel}
        </a>
      </div>
      {!error && (
        <div className="text-secondary">
          {loading ? "Загрузка..." : "Выбран по умолчанию"}
        </div>
      )}
    </div>
    {loading && <Spinner size={32}/>}
  </Card>
}

const dataConfigs: Record<SupportedDataConfigs, DataLoadConfig> = {
  [SupportedDataConfigs.Geography]: {
    title: "Квиз на знание географии",
    techs: ["GraphQL"],
    linkHref: "https://github.com/trevorblades/countries",
    linkLabel: "github.com/trevorblades/countries",
  }
}

export default DataLoadMenu;