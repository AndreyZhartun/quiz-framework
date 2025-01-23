import { Callout } from "@blueprintjs/core";
import { QuestionViewProps } from "./types";
import styles from "./QuestionView.module.scss";
import { useContext } from "react";
import GameContext from "../../../../context/gameContext";
import QuestionViewHeader from "./QuestionViewHeader";
import QuestionAnswerOptionView from "./QuestionAnswerOptionView";

const QuestionView: React.FC<QuestionViewProps> = () => {

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
          answerOption={ao}
        />)}
    </div>
  </>
}

export default QuestionView;