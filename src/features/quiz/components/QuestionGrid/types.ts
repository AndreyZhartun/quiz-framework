import { Intent } from "@blueprintjs/core";

export type QuestionGridProps = {
  onClick?: (questionId: string) => void;
  activeId?: string | null;
}

export type QuestionGridTile = {
  id: string;
  type: QuestionGridTileType;
}

/**
 * Тип тайла, показывающий статус вопроса.
 * Используется тип Intent напрямую из типов blueprint, чтобы не создавать лишние мапперы
 */
export type QuestionGridTileType = Extract<
  Intent, 
  'success' // правильный ответ на вопрос
  | 'danger' // неправильный ответ на вопрос
  | 'primary' // текущий вопрос
  | 'none' // будущий вопрос
>;