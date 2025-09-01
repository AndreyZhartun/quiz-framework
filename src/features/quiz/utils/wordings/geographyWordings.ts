import Wording from "../../models/Wording";
import { WordingsRecord } from "./wordingsDict";

/**
 * This file contains all logic for the construction of natural language sentences.
 * These are the types of questions that may be asked in a geography quiz
 */
enum GeographyQuestionTopics {
  CapitalToCountry = "CAPITAL_TO_COUNTRY",
  CountryToCapital = "COUNTRY_TO_CAPITAL",
}

const allTopics: GeographyQuestionTopics[] = [
  GeographyQuestionTopics.CapitalToCountry,
  GeographyQuestionTopics.CountryToCapital,
]

type TopicWordings = Record<GeographyQuestionTopics, Wording>;

/**
 * Question wording for each question type
 * (for each question a wording is randomly selected from this)
 */
const questionWordings: TopicWordings = {
  /**
   * Question would be worded like this:
   * {capital_name} is the capital of which country?
   */
  [GeographyQuestionTopics.CapitalToCountry]: [
    {type: 'field', content: 'capital'},
    {type: 'raw', content: ' is the capital of which country?'},
  ],
  /**
   * Question would be worded like this:
   * What city is the capital of the country {country_name}?
   */
  [GeographyQuestionTopics.CountryToCapital]: [
    {type: 'raw', content: 'What city is the capital of the country '},
    {type: 'field', content: 'name'},
    {type: 'raw', content: '?'}
  ],
}

/**
 * Wording of answer options for each question type/wording
 * @see questionWordings above
 */
const answerOptionWordings: TopicWordings = {
  [GeographyQuestionTopics.CapitalToCountry]: [
    {type: 'field', content: 'name'},
  ],
  [GeographyQuestionTopics.CountryToCapital]: [
    {type: 'field', content: 'capital'},
  ],
}

/**
 * All wording parameters for the geography quiz
 */
const geographyWordings: WordingsRecord<GeographyQuestionTopics> = {
  topics: allTopics,
  questionWordings,
  answerOptionWordings,
}

export default geographyWordings;