import getRandomInteger from "../../../utils/getRandomNumber";
import getUUID from "../../../utils/getUUID";
import shuffleArray from "../../../utils/shuffleArray";
import Country from "../models/Country";
import Question, { AnswerOption } from "../models/Question";

/**
 * Создать вопрос на основе списка стран
 */
const generateQuestion = (
  countries: Country[],
): Question => {

  const countryIndexArray = Array(countries.length)
    .fill(0)
    .map((_, index) => index);

  /**
   * Перемешанный массив индексов
   */
  const shuffledArray = shuffleArray(countryIndexArray);

  /**
   * Количество опций ответов
   */
  const ANSWER_OPTION_COUNT = 2;

  /**
   * Индексы ответов
   */
  const optionIndexes = shuffledArray.slice(0, ANSWER_OPTION_COUNT);

  /**
   * Случайно определить, какой из выбранных ответов будет правильным
   */
  const correctOptionIndex = getRandomInteger(optionIndexes.length - 1);

  /**
   * Найти индекс страны правильного ответа
   */
  const correctOptionCountryIndex = optionIndexes[correctOptionIndex]

  /**
   * Объект страны для правильного ответа
   */
  const correctOptionCountry = countries[correctOptionCountryIndex]

  /**
   * ID правильного ответа
   */
  const correctOptionId = getUUID();

  /**
   * Опции ответов
   */
  const answerOptions: AnswerOption[] = optionIndexes.map(index => ({
    id: index === correctOptionIndex ? correctOptionId : getUUID(),
    label: countries[index].name,
  }))

  return {
    number: 1,
    title: `${correctOptionCountry.capital} - столица какой страны?`,
    answerOptions,
    correctAnswerId: correctOptionId,
  }
}

export default generateQuestion;