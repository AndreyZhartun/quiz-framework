import { Section, SectionCard } from "@blueprintjs/core"
import GameContext from "../../../../context/gameContext";
import { useContext, useMemo } from "react";
import ProgressLevelBar from "./ProgressLevelBar";
import splitArrayEqually from "../../../../utils/splitArrayEqually";

/**
 * Прогресс квиза
 */
const ProgressMenu = () => {

  const {
    state,
  } = useContext(GameContext);

  const {
    answeredQuestions,
  } = state;

  const levelBars = useMemo(() => {
    return splitArrayEqually(answeredQuestions, 5);
  }, [answeredQuestions])
  
  return (
    <Section title="Игра в процессе" className="mb-2">
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