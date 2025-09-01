import Question from "../models/Question";
import generateQuestion, { GenerateQuestionParams } from "./generateQuestion";

type GenerateMultipleQuestionsParams = {
  count: number;
  generateParams: GenerateQuestionParams;
}

/**
 * Create multiple questions
 */
const generateMultipleQuestions = ({
  count,
  generateParams,
}: GenerateMultipleQuestionsParams): Question[] => {
  return Array.from({length: count}, () => generateQuestion(generateParams))
}

export default generateMultipleQuestions;