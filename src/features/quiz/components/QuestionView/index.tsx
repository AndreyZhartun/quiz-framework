import { QuestionViewProps } from "./types";

const QuestionView: React.FC<QuestionViewProps> = ({
    question: {
        number,
        title,
        answerOptions,
    },
}) => {
    return <div>
        <p>Вопрос №{number}</p>
        <p>{title}</p>
        {answerOptions.map(({id, label}) => 
            <button key={id}>
                {label}
            </button>)}
    </div>
}

export default QuestionView;