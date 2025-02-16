import { GameDataDictionary, SupportedDataConfigs } from "../../../reducer/constants";
import getRandomInteger from "../../../utils/getRandomNumber";
import getUUID from "../../../utils/getUUID";
import shuffleArray from "../../../utils/shuffleArray";
import Question, { AnswerOption } from "../models/Question";
import { QUESTION_ANSWER_OPTION_COUNT } from '../../../constants/globalConstants';
import wordingsDict from "./wordings/wordingsDict";

export type GenerateQuestionParams = {
  config: SupportedDataConfigs;
  dataDict: GameDataDictionary<Record<string, string>>;
}

/**
 * Создать вопрос на основе конфигурации и справочника
 */
const generateQuestion = ({
  config,
  dataDict,
}: GenerateQuestionParams): Question => {

  /**
   * Определить типы вопросов и формулировки вопросов/вариантов ответа
   */
  const {
    topics,
    questionWordings,
    answerOptionWordings,
  } = wordingsDict[config];

  /**
   * Случайно определить тему вопроса
   */
  const topic = topics[getRandomInteger(topics.length - 1)];

  /**
   * Перемешанный массив ключей.
   * Чтобы выбрать варианты ответов для вопроса, массив ключей перемешивается
   * и из него выбирается N элементов с начала массива, где N - количество вариантов ответа.
   */
  const shuffledKeys = shuffleArray([...dataDict.keys()]);

  /**
   * Ключи, которые будут представлены в опциях ответов
   */
  const optionKeys = shuffledKeys.slice(0, QUESTION_ANSWER_OPTION_COUNT);

  /**
   * Случайно определить, какой из выбранных ответов будет правильным
   */
  const correctAnswerKey = optionKeys[getRandomInteger(optionKeys.length - 1)];

  /**
   * ID правильного ответа
   */
  const correctAnswerId = getUUID();

  /**
   * Опции ответов
   */
  const answerOptions: AnswerOption[] = optionKeys.map(key => {

    const keyValue = dataDict.get(key);

    return ({
      id: key === correctAnswerKey ? correctAnswerId : getUUID(),
      label: answerOptionWordings[topic],
      /** data для key всегда будет существовать, потому что key берется напрямую из ключей dataDict */
      data: keyValue as Record<string, string>,
    });
  })

  return {
    id: getUUID(),
    title: questionWordings[topic],
    answerOptions,
    correctAnswerId,
  }
}

export default generateQuestion;