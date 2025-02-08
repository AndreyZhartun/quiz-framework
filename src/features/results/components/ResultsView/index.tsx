import { Section, SectionCard } from "@blueprintjs/core"
import { useState } from "react";
import QuestionGrid from "../../../quiz/components/QuestionGrid";
import AnsweredQuestionView from "./AnsweredQuestionView";

/**
 * Отображение результатов
 */
const ResultsView = () => {

  const [activeId, setActiveId] = useState<string | null>(null);
  
  return (
    <>
      <Section title={"Квиз закончен"}>
        <SectionCard>
          <QuestionGrid
            onClick={setActiveId}
            activeId={activeId}
          />
          {activeId && <AnsweredQuestionView id={activeId}/>}
        </SectionCard>
      </Section>
    </>
  )
}

export default ResultsView