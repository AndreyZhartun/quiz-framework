import { Card } from "@blueprintjs/core";
import TechList from "../TechList";

const usedTechs = [
  "GraphQL",
  "Apollo",
]

/**
 * Меню выбора квиза по географии
 */
const GeoQuizMenu: React.FC = () => {



  return <Card compact className="d-flex">
    <div>
      <h3 className="mb-1">Квиз на знание географии</h3>
      <div className="d-flex mb-3">
        <TechList techs={usedTechs}/>
        <a href="https://github.com/trevorblades/countries" target="_blank" rel="noopener" className="ml-1">
          github.com/trevorblades/countries
        </a>
      </div>
      <div className="text-secondary">Выбран по умолчанию</div>
    </div>
  </Card>
}

export default GeoQuizMenu;
