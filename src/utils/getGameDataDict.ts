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
     * Put only records without empty fields
     */
    if (!requiredKeys?.every(key => item[key])) {
      return;
    }

    dataDict.set(item[mainKey], item);
  })

  return dataDict;
}

type DictFillParams = {
  /** Map key field */
  mainKey: string;
  /** 
   * Keys required for the question wording
   * If the data object doesn't have those keys a different data object would be chosen.
   */
  requiredKeys?: string[];
}

/**
 * Dict filling settings for different configurations
 */
const dataDictFillConfigs: Record<SupportedDataConfigs, DictFillParams> = {
  [SupportedDataConfigs.Geography]: {
    mainKey: 'code',
    requiredKeys: ['code', 'name', 'capital'],
  }
}

export default getGameDataDict;