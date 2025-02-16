import Country from "../features/quiz/models/Country";
import { GameDataDictionary } from "../reducer/constants";

const getGameDataDict = (
  rawData: Country[],
): GameDataDictionary<Country> => {
  
  const dataDict: GameDataDictionary<Country> = new Map();

  rawData.forEach(item => {

    /**
     * Помещать в справочник только записи без пустых полей
     */
    if (!item.name || !item.capital) {
      return;
    }

    dataDict.set(item.code, item);
  })

  return dataDict;
}

export default getGameDataDict;