import { Callout } from "@blueprintjs/core";
import styles from "./QuestionView.module.scss";
import { memo, useContext } from "react";
import GameContext from "../../../../context/gameContext";
import QuestionViewHeader from "./QuestionViewHeader";
import QuestionAnswerOptionView from "./QuestionAnswerOptionView";

/**
 * Display the current question with answer options
 */
const QuestionView: React.FC = () => {

  const {
    state: {
      current,
    },
  } = useContext(GameContext);

  if (!current) {
    return <Callout intent="danger">
      Error loading question
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

export default memo(QuestionView);