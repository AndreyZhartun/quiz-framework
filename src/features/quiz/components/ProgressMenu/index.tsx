import { Section, SectionCard } from "@blueprintjs/core";
import QuestionGrid from "../QuestionGrid";
import { memo } from "react";

/**
 * Quiz progress
 */
const ProgressMenu = () => {
  
  return (
    <Section title="Game in progress" className="mb-2">
      <SectionCard>
        <QuestionGrid/>
      </SectionCard>
    </Section>
  )
}

export default memo(ProgressMenu)