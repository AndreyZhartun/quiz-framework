import { memo, useContext } from 'react'
import GameContext from '../../../../../context/gameContext';
import { Card } from '@blueprintjs/core';
import WordingView from '../WordingView';

/**
 * The title of the question with the wording of the question itself
 */
const QuestionViewHeader = () => {

  const {
    state: {
      current,
    },
  } = useContext(GameContext);

  const correctAnswerCountry = current?.answerOptions.find(({id}) => id === current.correctAnswerId)?.data;

  if (!current || !correctAnswerCountry) {

    throw new Error("Question title error");
  }
  
  return <div className="d-flex mb-2">
    <Card className="flex-grow-1">
      <WordingView wording={current.title} data={correctAnswerCountry}/>
    </Card>
</div>
}

export default memo(QuestionViewHeader);