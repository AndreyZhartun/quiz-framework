import Wording from "../models/Wording";

export enum QuestionTopics {
  CapitalToCountry = "CAPITAL_TO_COUNTRY",
  CountryToCapital = "COUNTRY_TO_CAPITAL",
}

export const allTopics: QuestionTopics[] = [
  QuestionTopics.CapitalToCountry,
  QuestionTopics.CountryToCapital,
]

type TopicWordings = Record<QuestionTopics, Wording>;

export const questionWordings: TopicWordings = {
  [QuestionTopics.CapitalToCountry]: [
    {type: 'field', content: 'capital'},
    {type: 'raw', content: ' - столица какой страны?'},
  ],
  [QuestionTopics.CountryToCapital]: [
    {type: 'raw', content: 'Какой город является столицей страны '},
    {type: 'field', content: 'name'},
    {type: 'raw', content: '?'}
  ],
}

export const answerOptionWordings: TopicWordings = {
  [QuestionTopics.CapitalToCountry]: [
    {type: 'field', content: 'name'},
  ],
  [QuestionTopics.CountryToCapital]: [
    {type: 'field', content: 'capital'},
  ],
}
