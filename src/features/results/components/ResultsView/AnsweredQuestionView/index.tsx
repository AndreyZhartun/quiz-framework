import React, { memo, useContext, useMemo } from 'react'
import { AnsweredQuestionViewProps } from './types'
import GameContext from '../../../../../context/gameContext';
import { Card, Tag, TagProps } from '@blueprintjs/core';
import WordingView from '../../../../quiz/components/QuestionView/WordingView';

/**
 * Detailed display of the answered question
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
  }, [answeredQuestions, id])

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
    throw new Error("Question title error");
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
           * Green for correct, red for wrong
           */
          const intent = getAnsweredQuestionTagIntent({id, correctAnswerId, givenAnswerId});

          return <Tag key={id} className="mr-1" intent={intent || undefined}>
            <WordingView wording={label} data={data}/>
          </Tag>
        })}
      </div>
    </Card>
  )
}

type GetAnsweredQuestionTagIntentParams = {
  id: string;
  correctAnswerId: string;
  givenAnswerId: string;
}

const getAnsweredQuestionTagIntent = ({
  id,
  correctAnswerId,
  givenAnswerId,
}: GetAnsweredQuestionTagIntentParams): TagProps['intent'] | null => {
  if (id === correctAnswerId) {
    return "success";
  }

  if (id === givenAnswerId) {
    return "danger";
  }

  return null;
};

export default memo(AnsweredQuestionView)