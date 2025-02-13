import React, { useContext, useMemo } from 'react'
import { AnsweredQuestionViewProps } from './types'
import GameContext from '../../../../../context/gameContext';
import { Card, Tag } from '@blueprintjs/core';
import WordingView from '../../../../quiz/components/QuestionView/WordingView';

/**
 * Подробное отображение вопроса, на который был дан ответ
 */
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

  const {
    question: {
      title,
      answerOptions,
      correctAnswerId,
    },
    givenAnswerId,
  } = activeAnsweredQuestion;

  const correctAnswerCountry = answerOptions
    .find(({id}) => id === correctAnswerId)
    ?.data;

  if (!correctAnswerCountry) {
    throw new Error("Ошибка заголовка вопроса");
  }

  return (
    <Card className="mt-3">
      <WordingView
        wording={title}
        data={correctAnswerCountry}
      />
      <div className="d-flex mt-1">
        {answerOptions.map(({id, label, data}) => {

          /**
           * Показать зеленым, если это правильный ответ.
           * Показать красным, если этот ответ был выбран и он неправильный.
           */
          const intent = id === correctAnswerId 
            ? "success" 
            : id == givenAnswerId 
              ? "danger" 
              : undefined;

          return <Tag className="mr-1" intent={intent}>
            <WordingView wording={label} data={data}/>
          </Tag>
        })}
      </div>
    </Card>
  )
}

export default AnsweredQuestionView