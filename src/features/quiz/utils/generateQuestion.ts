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
 * Create a question based on configuration and reference
 */
const generateQuestion = ({
  config,
  dataDict,
}: GenerateQuestionParams): Question => {

  /**
   * Get question types and question/answer options wording
   */
  const {
    topics,
    questionWordings,
    answerOptionWordings,
  } = wordingsDict[config];

  /**
   * Topic is random for each question
   */
  const topic = topics[getRandomInteger(topics.length - 1)];

  const shuffledKeys = shuffleArray([...dataDict.keys()]);

  /**
   * Keys that will be displayed as the answer options
   */
  const optionKeys = shuffledKeys.slice(0, QUESTION_ANSWER_OPTION_COUNT);

  /**
   * Randomly determine the correct answer
   */
  const correctAnswerKey = optionKeys[getRandomInteger(optionKeys.length - 1)];

  /**
   * Generate ID for the correct answer
   */
  const correctAnswerId = getUUID();

  const answerOptions: AnswerOption[] = optionKeys.map(key => {

    const keyValue = dataDict.get(key);

    return ({
      id: key === correctAnswerKey ? correctAnswerId : getUUID(),
      label: answerOptionWordings[topic],
      /** data for key will always exist because key is taken directly from the dataDict keys */
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