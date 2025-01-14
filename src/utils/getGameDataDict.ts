import Country from "../features/quiz/models/Country";
import { GameDataDictionary } from "../reducer/constants";

const getGameDataDict = (
  rawData: Country[],
): GameDataDictionary<Country> => {
  
  const dataDict: GameDataDictionary<Country> = new Map();

  rawData.forEach(item => {
    dataDict.set(item.code, item);
  })

  return dataDict;
}

export default getGameDataDict;