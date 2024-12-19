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

export default Question;