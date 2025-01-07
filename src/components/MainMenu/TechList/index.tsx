import { Tag } from "@blueprintjs/core"
import { TechListProps } from "./types"

/**
 * Список тэгов с используемыми технологиями
 */
const TechList: React.FC<TechListProps> = ({
  techs,
  className,
}) => (
  <div className={className}>
    {techs.map(tech => <Tag key={tech} className="mr-1">{tech}</Tag>)}
  </div>
)

export default TechList