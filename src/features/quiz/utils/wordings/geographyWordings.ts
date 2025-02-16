import Wording from "../../models/Wording";
import { WordingsRecord } from "./wordingsDict";

/**
 * Типы вопросов, которые могут быть заданы в квизе по георграфии
 */
enum GeographyQuestionTopics {
  CapitalToCountry = "CAPITAL_TO_COUNTRY",
  CountryToCapital = "COUNTRY_TO_CAPITAL",
}

/**
 * Массив со всеми типами
 */
const allTopics: GeographyQuestionTopics[] = [
  GeographyQuestionTopics.CapitalToCountry,
  GeographyQuestionTopics.CountryToCapital,
]

type TopicWordings = Record<GeographyQuestionTopics, Wording>;

/**
 * Формулировки вопросов для каждого типа вопроса
 */
const questionWordings: TopicWordings = {
  [GeographyQuestionTopics.CapitalToCountry]: [
    {type: 'field', content: 'capital'},
    {type: 'raw', content: ' - столица какой страны?'},
  ],
  [GeographyQuestionTopics.CountryToCapital]: [
    {type: 'raw', content: 'Какой город является столицей страны '},
    {type: 'field', content: 'name'},
    {type: 'raw', content: '?'}
  ],
}

/**
 * Формулировки вариантов ответа для каждого типа вопроса
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
 * Параметры формулировок для квиза по географии
 */
const geographyWordings: WordingsRecord<GeographyQuestionTopics> = {
  topics: allTopics,
  questionWordings,
  answerOptionWordings,
}

export default geographyWordings;