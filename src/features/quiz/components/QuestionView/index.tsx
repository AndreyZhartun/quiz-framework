import { Callout, Card } from "@blueprintjs/core";
import { QuestionViewProps } from "./types";
import styles from "./QuestionView.module.scss";
import { useCallback, useContext } from "react";
import GameContext from "../../../../context/gameContext";
import { processAnswerAction } from "../../../../reducer/actions";
import useDispatch from "../../../../hooks/useDispatch";

const QuestionView: React.FC<QuestionViewProps> = () => {

  const dispatch = useDispatch();

  const {
    state: {
      current,
    },
  } = useContext(GameContext);

  const processQuestionAnswer = useCallback((answedId: string) => {
    dispatch(processAnswerAction(answedId));
  }, []);

  if (!current) {
    return <Callout intent="danger">
      Ошибка загрузки вопроса
    </Callout>
  }

  const {
    title,
    answerOptions,
  } = current;

  return <>
    <div className="d-flex mb-3">
      <Card className="mr-2">?</Card>
      <Card className="flex-grow-1">{title}</Card>
    </div>

    <div className={styles['container']}>
      {answerOptions.map(({id, label}) => 
        <Card 
          key={id} 
          interactive 
          onClick={() => processQuestionAnswer(id)}
          className={styles['container-button']}>
          {label}
        </Card>)}
    </div>
  </>
}

export default QuestionView;