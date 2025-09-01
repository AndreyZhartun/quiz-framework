import { memo, useContext, useMemo } from 'react'
import GameContext from '../../../../context/gameContext';
import styles from "./QuestionGrid.module.scss";
import { Tag, TagProps } from '@blueprintjs/core';
import { QuestionGridProps, QuestionGridTile, QuestionGridTileType } from './types';
import { GameStatuses } from '../../../../reducer/constants';
import useMobileDetector from '../../../../hooks/useMobileDetector';
import classNames from 'classnames';

/**
 * Question grid, shows past, current and future questions
 */
const QuestionGrid: React.FC<QuestionGridProps> = ({
  onClick,
  activeId,
}) => {

  const {
    state: {
      status,
      answeredQuestions,
      current,
      queue,
    },
  } = useContext(GameContext);

  /**
   * Grid tiles
   */
  const tiles = useMemo<QuestionGridTile[]>(() => {

    /**
     * Answered questions output
     */
    const output: QuestionGridTile[] = answeredQuestions.map(({question, givenAnswerId}) => ({
      id: question.id,
      type: givenAnswerId === question.correctAnswerId ? "success" : "danger",
    }));

    /**
     * If the game is not in progress, then there is nothing else to show.
     */
    if (status !== GameStatuses.Ongoing) {
      return output;
    }

    /**
     * Current question
     */
    if (current) {
      output.push({
        id: current.id,
        type: "primary",
      })
    }

    /**
     * Future questions from the queue
     */
    if (queue.length) {
      output.push(
        ...queue.map(futureQuestion => ({
          id: futureQuestion.id,
          type: "none" as const,
        }))
      )
    }

    return output;
  }, [status, answeredQuestions, current, queue]);
  
  /**
   * Hide icons on mobile so that question numbers are always visible.
   */
  const isMobile = useMobileDetector();

  return (
    <div className={styles["grid"]}>
      {tiles.map(({id, type}, index) => {
        return <Tag 
          key={id}
          large
          icon={isMobile ? undefined : tileIcons[type]} 
          intent={type} 
          onClick={onClick 
            ? () => {
                onClick(id);
              }
            : undefined}
          interactive={!!onClick}
          minimal
          active={id === activeId}
          className={classNames(styles["grid-card"])}>
          <div className={classNames(isMobile && "d-flex justify-content-center")}>{index + 1}</div>
        </Tag>
      })}
    </div>
  )
}

/**
 * Icons for different types of tiles
 */
const tileIcons: Record<QuestionGridTileType, TagProps["icon"]> = {
  success: "small-tick",
  danger: "small-cross",
  primary: "generate",
  none: "small-minus",
}

export default memo(QuestionGrid);