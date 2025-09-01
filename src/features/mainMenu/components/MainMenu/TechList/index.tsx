import { Tag } from "@blueprintjs/core"
import { TechListProps } from "./types"
import { memo } from "react"

/**
 * Used techs list
 */
const TechList: React.FC<TechListProps> = ({
  techs,
  className,
}) => (
  <div className={className}>
    {techs.map(tech => <Tag key={tech} className="mr-1">{tech}</Tag>)}
  </div>
)

export default memo(TechList);