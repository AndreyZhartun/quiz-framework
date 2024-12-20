type Question = {
    number: number;
    title: string;
    answerOptions: AnswerOption[];
    correctAnswerId: string;
}

export type AnswerOption = {
    id: string;
    label: string;
}

export type AnsweredQuestion = {
    question: Question;
    givenAnswerId: string;
}

export default Question;