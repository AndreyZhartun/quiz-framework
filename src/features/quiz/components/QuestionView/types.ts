import Question from "../../models/Question"

export type QuestionViewProps = {
    question: Question;
    processAnswer: (id: string) => void;
}