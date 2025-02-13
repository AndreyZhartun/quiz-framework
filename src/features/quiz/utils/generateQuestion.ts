import { GameDataDictionary } from "../../../reducer/constants";
import getRandomInteger from "../../../utils/getRandomNumber";
import getUUID from "../../../utils/getUUID";
import shuffleArray from "../../../utils/shuffleArray";
import Question, { AnswerOption } from "../models/Question";
import { QUESTION_ANSWER_OPTION_COUNT } from '../../../constants/globalConstants';
import Country from '../models/Country';
import { allTopics, answerOptionWordings, questionWordings } from "./wordings";

/**
 * Создать вопрос на основе справочника стран
 */
const generateQuestion = (
  dataDict: GameDataDictionary<Country>,
): Question => {

  /**
   * Случайно определить тему вопроса
   */
  const topic = allTopics[getRandomInteger(allTopics.length - 1)];

  /**
   * Перемешанный массив кодов стран
   */
  const shuffledCodes = shuffleArray([...dataDict.keys()]);

  /**
   * Коды стран, которые будут представлены в опциях ответов
   */
  const optionCodes = shuffledCodes.slice(0, QUESTION_ANSWER_OPTION_COUNT);

  /**
   * Случайно определить, какой из выбранных ответов будет правильным
   */
  const correctAnswerCode = optionCodes[getRandomInteger(optionCodes.length - 1)];

  /**
   * ID правильного ответа
   */
  const correctOptionId = getUUID();

  /**
   * Опции ответов
   */
  const answerOptions: AnswerOption[] = optionCodes.map(code => {

    const country = dataDict.get(code);

    return ({
      id: code === correctAnswerCode ? correctOptionId : getUUID(),
      label: answerOptionWordings[topic],
      /** data для code всегда будет существовать, потому что code берется напрямую из ключей dataDict */
      data: country as Country,
    });
  })

  return {
    id: getUUID(),
    title: questionWordings[topic],
    answerOptions,
    correctAnswerId: correctOptionId,
  }
}

export default generateQuestion;