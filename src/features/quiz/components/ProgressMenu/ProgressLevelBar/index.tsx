import { ProgressBar } from "@blueprintjs/core";
import { ProgressLevelBarProps } from "./types";

/**
 * 
 */
const ProgressLevelBar: React.FC<ProgressLevelBarProps> = ({
  items,
}) => {

  return (
    <div className="d-flex mb-1">
      {items.map(({question, givenAnswerId}) => {

        const isCorrect = question.correctAnswerId === givenAnswerId;
        
        return <ProgressBar
          key={givenAnswerId}
          intent={isCorrect ? "success" : "danger"}
          animate={false}
        />;
      })}
    </div>
  )
}

export default ProgressLevelBar;