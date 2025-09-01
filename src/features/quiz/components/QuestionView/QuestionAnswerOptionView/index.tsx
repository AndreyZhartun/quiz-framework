import React, { memo, useCallback } from 'react'
import { processAnswerAction } from '../../../../../reducer/actions';
import useDispatch from '../../../../../hooks/useDispatch';
import { QuestionAnswerOptionViewProps } from './types';
import WordingView from '../WordingView';
import { Card } from '@blueprintjs/core';

/**
 * Displaying the answer option for a question
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
  }, [dispatch]);
  
  return <Card 
    key={id} 
    interactive 
    onClick={() => {
      processQuestionAnswer(id);
    }}>
    <WordingView wording={label} data={data}/>
  </Card>
}

export default memo(QuestionAnswerOptionView);