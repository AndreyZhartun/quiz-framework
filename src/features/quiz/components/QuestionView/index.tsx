import { QuestionViewProps } from "./types";

const QuestionView: React.FC<QuestionViewProps> = ({
    question: {
        number,
        title,
        answerOptions,
    },
    processAnswer,
}) => {

    return <div>
        <p>Вопрос №{number}</p>
        <p>{title}</p>
        {answerOptions.map(({id, label}) => 
            <button key={id} onClick={() => processAnswer(id)}>
                {label}
            </button>)}
    </div>
}

export default QuestionView;