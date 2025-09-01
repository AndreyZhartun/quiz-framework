import { Section, SectionCard } from "@blueprintjs/core"
import { memo, useState } from "react";
import QuestionGrid from "../../../quiz/components/QuestionGrid";
import AnsweredQuestionView from "./AnsweredQuestionView";

/**
 * Displays the results if the quiz
 */
const ResultsView = () => {

  const [activeId, setActiveId] = useState<string | null>(null);
  
  return (
    <>
      <Section title={"The end"}>
        <SectionCard>
          <div className="mb-2">Click on the question number to see the details of the question and answer</div>
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

export default memo(ResultsView)