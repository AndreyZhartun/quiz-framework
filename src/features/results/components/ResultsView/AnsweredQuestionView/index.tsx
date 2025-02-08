import React, { useContext, useMemo } from 'react'
import { AnsweredQuestionViewProps } from './types'
import GameContext from '../../../../../context/gameContext';
import { Card } from '@blueprintjs/core';
import WordingView from '../../../../quiz/components/QuestionView/WordingView';

const AnsweredQuestionView: React.FC<AnsweredQuestionViewProps> = ({
  id,
}) => {

  const {
    state: {
      answeredQuestions,
    },
  } = useContext(GameContext);

  const activeAnsweredQuestion = useMemo(() => {
    return answeredQuestions.find(({question}) => question.id === id) || null;
  }, [id])

  if (!activeAnsweredQuestion) {
    return null;
  }

  const correctAnswerCountry = activeAnsweredQuestion.question.answerOptions.find(({id}) => id === activeAnsweredQuestion.question.correctAnswerId)?.data;
  if (!correctAnswerCountry) {

    throw new Error("Ошибка заголовка вопроса");
  }

  return (
    <Card className="mt-3">
      <WordingView
        wording={activeAnsweredQuestion.question.title}
        data={correctAnswerCountry}
      />
    </Card>
  )
}

export default AnsweredQuestionView