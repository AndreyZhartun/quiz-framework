import { GameDataDictionary } from "../../../reducer/constants";
import getRandomInteger from "../../../utils/getRandomNumber";
import getUUID from "../../../utils/getUUID";
import shuffleArray from "../../../utils/shuffleArray";
import Question, { AnswerOption } from "../models/Question";
import { QUESTION_ANSWER_OPTION_COUNT } from '../../../constants/globalConstants';
import Country from '../models/Country';
import { answerOptionWordings, QuestionTopics, questionWordings } from "./wordings";

/**
 * Создать вопрос на основе справочника стран
 */
const generateQuestion = (
  dataDict: GameDataDictionary<Country>,
): Question => {

  const topic = QuestionTopics.CapitalToCountry;

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
      // label: country ? optionLabelConstructor(country) : "Имя неизвестно",
      label: answerOptionWordings[topic],
      data: country || null,
    });
  })

  return {
    // title: correctAnswerCountry ? questionLabelConstructor(correctAnswerCountry) : `Неизвестная ошибка`,
    title: questionWordings[topic],
    answerOptions,
    correctAnswerId: correctOptionId,
  }
}

export default generateQuestion;