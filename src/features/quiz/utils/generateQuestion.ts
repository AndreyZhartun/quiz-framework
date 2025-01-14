import { GameDataDictionary } from "../../../reducer/constants";
import getRandomInteger from "../../../utils/getRandomNumber";
import getUUID from "../../../utils/getUUID";
import shuffleArray from "../../../utils/shuffleArray";
import Question, { AnswerOption } from "../models/Question";
import { QUESTION_ANSWER_OPTION_COUNT } from '../../../constants/globalConstants';
import Country from '../models/Country';

/**
 * Создать вопрос на основе справочника стран
 */
const generateQuestion = (
  dataDict: GameDataDictionary<Country>,
): Question => {

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
  
  const {
    questionLabelConstructor,
    optionLabelConstructor,
  } = getLabelConstructors();

  /**
   * Опции ответов
   */
  const answerOptions: AnswerOption[] = optionCodes.map(code => {

    const country = dataDict.get(code);

    return ({
      id: code === correctAnswerCode ? correctOptionId : getUUID(),
      label: country ? optionLabelConstructor(country) : "Имя неизвестно",
    });
  })

  const correctAnswerCountry = dataDict.get(correctAnswerCode);

  return {
    title: correctAnswerCountry ? questionLabelConstructor(correctAnswerCountry) : `Неизвестная ошибка`,
    answerOptions,
    correctAnswerId: correctOptionId,
  }
}

/**
 * Конструкторы надписей
 */
type LabelConstructors = {
  questionLabelConstructor: (country: Country) => string;
  optionLabelConstructor: (country: Country) => string;
}

/**
 * Функция, которая возвращает объект с конструкторами надписей вопроса и ответов
 */
const getLabelConstructors = (

): LabelConstructors => {
  return {
    questionLabelConstructor: ({capital}) => `${capital} - столица какой страны?`,
    optionLabelConstructor: ({name}) => name,
  }
}

export default generateQuestion;