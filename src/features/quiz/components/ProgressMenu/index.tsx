import { Section, SectionCard } from "@blueprintjs/core"
import GameContext from "../../context/gameContext";
import { useContext, useMemo } from "react";
import { AnsweredQuestion } from "../../models/Question";
import ProgressLevelBar from "./ProgressLevelBar";

/**
 * 
 */
const ProgressMenu = () => {

  const {
    state,
  } = useContext(GameContext);

  const {
    answeredQuestions,
  } = state;

  const levelBars = useMemo(() => {
    let startSliceIndex = 0;

    const output: (AnsweredQuestion[])[] = [];

    while (answeredQuestions[startSliceIndex]) {

      output.push(
        answeredQuestions.slice(startSliceIndex, startSliceIndex + 5),
      )

      startSliceIndex += 5;
    }

    return output;
  }, [answeredQuestions])
  
  return (
    <Section title="Игра в процессе">
      <SectionCard>
        Игра
        {levelBars.map((level, index) => {
          return <ProgressLevelBar key={index} items={level}/>
        })}
      </SectionCard>
    </Section>
  )
}

export default ProgressMenu