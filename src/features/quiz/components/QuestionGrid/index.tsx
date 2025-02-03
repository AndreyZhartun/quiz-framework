import { useContext } from 'react'
import GameContext from '../../../../context/gameContext';
import styles from "./QuestionGrid.module.scss";
import { Tag } from '@blueprintjs/core';
import { QuestionGridProps } from './types';

/**
 * Сетка-история вопросов
 */
const QuestionGrid: React.FC<QuestionGridProps> = ({
  onClick,
}) => {

  const {
    state: {
      answeredQuestions,
    },
  } = useContext(GameContext);
  
  return (
    <div className={styles["grid"]}>
      {answeredQuestions.map((answer, index) => {

        const isCorrectAnswer = answer.givenAnswerId === answer.question.correctAnswerId;

        const intent = isCorrectAnswer ? "success" : "danger";

        const icon = isCorrectAnswer ? "tick" : "cross";

        return <Tag 
          key={answer.question.id}
          large 
          icon={icon} 
          intent={intent} 
          onClick={onClick ? () => onClick(answer.question.id) : undefined}
          interactive={!!onClick}>
          <div className={styles["grid-card-text"]}>{index + 1}</div>
        </Tag>
      })}
    </div>
  )
}

export default QuestionGrid;