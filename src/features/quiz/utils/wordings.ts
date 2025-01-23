import Wording from "../models/Wording";

export enum QuestionTopics {
  CapitalToCountry = "CAPITAL_TO_COUNTRY",
}

type TopicWordings = Record<QuestionTopics, Wording>;

export const questionWordings: TopicWordings = {
  CAPITAL_TO_COUNTRY: [
    {type: 'field', content: 'capital'},
    {type: 'raw', content: ' - столица какой страны?'},
  ],
}

export const answerOptionWordings: TopicWordings = {
  CAPITAL_TO_COUNTRY: [
    {type: 'field', content: 'name'},
  ]
}
