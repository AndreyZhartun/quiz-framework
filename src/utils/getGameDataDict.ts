import { GameDataDictionary, SupportedDataConfigs } from "../reducer/constants";

export type GetGameDataDictParams<T extends Record<string, string>> = {
  config: SupportedDataConfigs;
  rawData: T[];
}

const getGameDataDict = <T extends Record<string, string>>({
  config,
  rawData,
}: GetGameDataDictParams<T>): GameDataDictionary<T> => {

  const {
    mainKey,
    requiredKeys,
  } = dataDictFillConfigs[config];
  
  const dataDict: GameDataDictionary<T> = new Map();

  rawData.forEach(item => {

    /**
     * Помещать в справочник только записи без пустых полей
     */
    if (!requiredKeys?.every(key => item[key])) {
      return;
    }

    dataDict.set(item[mainKey], item);
  })

  return dataDict;
}

type DictFillParams = {
  /** поле ключа Map */
  mainKey: string;
  /** необходимые для вопросов поля */
  requiredKeys?: string[];
}

/**
 * Настройки заполнения справочника для различных конфигураций
 */
const dataDictFillConfigs: Record<SupportedDataConfigs, DictFillParams> = {
  [SupportedDataConfigs.Geography]: {
    mainKey: 'code',
    requiredKeys: ['code', 'name', 'capital'],
  }
}

export default getGameDataDict;