import { Callout } from "@blueprintjs/core";
import styles from "./QuestionView.module.scss";
import { useContext } from "react";
import GameContext from "../../../../context/gameContext";
import QuestionViewHeader from "./QuestionViewHeader";
import QuestionAnswerOptionView from "./QuestionAnswerOptionView";

/**
 * Отображение текущего вопроса с вариантами ответов
 */
const QuestionView: React.FC = () => {

  const {
    state: {
      current,
    },
  } = useContext(GameContext);

  if (!current) {
    return <Callout intent="danger">
      Ошибка загрузки вопроса
    </Callout>
  }

  const {
    answerOptions,
  } = current;

  return <>
    <QuestionViewHeader/>

    <div className={styles['container']}>
      {answerOptions.map(ao => 
        <QuestionAnswerOptionView 
          key={ao.id}
          answerOption={ao}
        />)}
    </div>
  </>
}

export default QuestionView;