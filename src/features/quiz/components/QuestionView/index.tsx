import { Card, Section, SectionCard } from "@blueprintjs/core";
import { QuestionViewProps } from "./types";
import styles from "./QuestionView.module.scss";

const QuestionView: React.FC<QuestionViewProps> = ({
    question: {
        number,
        title,
        answerOptions,
    },
    processAnswer,
}) => {

    return <>
        <div className="d-flex mb-3">
            <Card className="mr-2">{number}</Card>
            <Card>{title}</Card>
        </div>

        <div className={styles['container']}>
            {answerOptions.map(({id, label}) => 
                <Card 
                    key={id} 
                    interactive 
                    onClick={() => processAnswer(id)}
                    className={styles['container-button']}>
                    {label}
                </Card>)}
        </div>
    </>
}

export default QuestionView;