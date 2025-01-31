import { Callout, Section, SectionCard } from "@blueprintjs/core"
import { useContext } from "react";
import GameContext from "../../../../context/gameContext";
import styles from "./ResultsView.module.scss";

/**
 * Отображение результатов
 */
const ResultsView = () => {

  const {
    state: {
      answeredQuestions,
    },
  } = useContext(GameContext);
  
  return (
    <>
      <Section title={"Квиз закончен"}>
        <SectionCard>
          <div className={styles["grid"]}>
            {answeredQuestions.map((answer, index) => {

              const intent = answer.givenAnswerId === answer.question.correctAnswerId
                ? "success" 
                : "danger";

              return <Callout key={answer.givenAnswerId} intent={intent} compact>
                {index + 1}
              </Callout>
            })}
          </div>
        </SectionCard>
      </Section>
    </>
  )
}

export default ResultsView