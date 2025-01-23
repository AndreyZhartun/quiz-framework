import { useContext } from 'react'
import GameContext from '../../../../../context/gameContext';
import { Card } from '@blueprintjs/core';
import WordingView from '../WordingView';

/**
 * Заголовок вопроса с формулировкой самого вопроса
 */
const QuestionViewHeader = () => {

  const {
    state: {
      current,
    },
  } = useContext(GameContext);

  const correctAnswerCountry = current?.answerOptions.find(({id}) => id === current.correctAnswerId)?.data;

  if (!current || !correctAnswerCountry) {

    throw new Error("Ошибка заголовка вопроса");
  }
  
  return <div className="d-flex mb-3">
    <Card className="mr-2">?</Card>
    <Card className="flex-grow-1">
      <WordingView wording={current.title} data={correctAnswerCountry}/>
    </Card>
</div>
}

export default QuestionViewHeader