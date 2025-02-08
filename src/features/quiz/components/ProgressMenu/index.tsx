import { Section, SectionCard } from "@blueprintjs/core";
import QuestionGrid from "../QuestionGrid";

/**
 * Прогресс квиза
 */
const ProgressMenu = () => {
  
  return (
    <Section title="Игра в процессе" className="mb-2">
      <SectionCard>
        <QuestionGrid/>
      </SectionCard>
    </Section>
  )
}

export default ProgressMenu