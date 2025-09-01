import { Section, SectionCard } from "@blueprintjs/core";
import GeoQuizMenu from "./GeoQuizMenu";
import TechList from "./TechList";
import { memo } from "react";

const usedTechs = [
  "React",
  "BlueprintJS",
  "Sass",
]

/**
 * Main menu.
 * This menu is supposed to allow you to select a quiz from the list.
 * Only one quiz (Geography quiz) is available at the moment.
 * @see SupportedDataConfigs - supported quizzes
 */
const MainMenu: React.FC = () => {
  return <Section title={"Quiz framework"} className="mr-2 mb-2">
    <SectionCard>
      <div className="mb-1">This small project is a framework for quiz games.</div>
      <TechList techs={usedTechs} className="mb-2"/>
      <GeoQuizMenu/>
    </SectionCard>
  </Section>
}

export default memo(MainMenu);