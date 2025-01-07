import { Section, SectionCard } from "@blueprintjs/core";
import GeoQuizMenu from "./GeoQuizMenu";
import TechList from "./TechList";

const usedTechs = [
  "React",
  "BlueprintJS",
  "Sass",
]

const MainMenu: React.FC = () => {
  return <Section title={"Квиз-Фреймворк"} className="mr-2 mb-2">
    <SectionCard>
      <div className="mb-1">Этот небольшой проект - фреймворк для игр-квизов</div>
      <TechList techs={usedTechs} className="mb-2"/>
      <GeoQuizMenu/>
    </SectionCard>
  </Section>
}

export default MainMenu;