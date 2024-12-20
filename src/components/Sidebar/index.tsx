import { Section, SectionCard, Tag } from "@blueprintjs/core";

const usedTechs = [
    "React",
    "GraphQL",
    "Apollo",
    "BlueprintJS",
    "Sass"
]

const Sidebar: React.FC = () => {
    return <Section title={"Географический квиз"} className="mr-2">
        <SectionCard>
            <div className="mb-1">Этот небольшой проект - игра-квиз на знание географии</div>
            {usedTechs.map(tech => <Tag key={tech} className="mr-1 mb-1">{tech}</Tag>)}
        </SectionCard>
        <SectionCard>
            Этот проект использует API https://github.com/trevorblades/countries
        </SectionCard>
    </Section>
}

export default Sidebar;