import { useContext, useMemo } from 'react'
import GameContext from '../../../../context/gameContext';
import styles from "./QuestionGrid.module.scss";
import { Tag, TagProps } from '@blueprintjs/core';
import { QuestionGridProps, QuestionGridTile, QuestionGridTileType } from './types';
import { GameStatuses } from '../../../../reducer/constants';
import useMobileDetector from '../../../../hooks/useMobileDetector';
import classNames from 'classnames';

/**
 * Сетка вопросов, показывает прошлый, текущий и будущие вопросы
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
   * Тайлы сетки
   */
  const tiles = useMemo<QuestionGridTile[]>(() => {

    const output: QuestionGridTile[] = answeredQuestions.map(({question, givenAnswerId}) => ({
      id: question.id,
      type: givenAnswerId === question.correctAnswerId ? "success" : "danger",
    }));

    /**
     * Если игра не в процессе, то больше нет ничего, что можно показать
     */
    if (status !== GameStatuses.Ongoing) {
      return output;
    }

    /**
     * Текущий вопрос
     */
    if (current) {
      output.push({
        id: current.id,
        type: "primary",
      })
    }

    /**
     * Будущие вопросы из очереди
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
   * На мобильных не показывать иконки, чтобы номера вопросов всегда были видны
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
 * Иконки для различных типов тайлов
 */
const tileIcons: Record<QuestionGridTileType, TagProps["icon"]> = {
  success: "small-tick",
  danger: "small-cross",
  primary: "generate",
  none: "small-minus",
}

export default QuestionGrid;