import React, { useCallback } from 'react'
import { processAnswerAction } from '../../../../../reducer/actions';
import useDispatch from '../../../../../hooks/useDispatch';
import { QuestionAnswerOptionViewProps } from './types';
import WordingView from '../WordingView';
import { Card } from '@blueprintjs/core';

/**
 * Отображение варианта ответа на вопрос
 */
const QuestionAnswerOptionView: React.FC<QuestionAnswerOptionViewProps> = ({
  answerOption: {
    id,
    label,
    data,
  },
}) => {

  const dispatch = useDispatch();
  
  const processQuestionAnswer = useCallback((answedId: string) => {
    dispatch(processAnswerAction(answedId));
  }, []);
  
  return <Card 
    key={id} 
    interactive 
    onClick={() => processQuestionAnswer(id)}>
    <WordingView wording={label} data={data}/>
  </Card>
}

export default QuestionAnswerOptionView