import Wording from "./Wording";

type Question = {
  id: string;
  title: Wording;
  answerOptions: AnswerOption[];
  correctAnswerId: string;
}

export type AnswerOption = {
  id: string;
  label: Wording;
  data: Record<string, unknown> | null;
}

export type AnsweredQuestion = {
  question: Question;
  givenAnswerId: string;
}

export default Question;