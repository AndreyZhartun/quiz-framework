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
 * Tile type showing the status of the question.
 * The Intent type is used directly from the BlueprintJS types to avoid creating extra mappers
 */
export type QuestionGridTileType = Extract<
  Intent, 
  'success' // correct answer to question
  | 'danger' // incorrect answer to question
  | 'primary' // current question
  | 'none' // future question
>;