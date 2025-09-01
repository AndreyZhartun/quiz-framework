
/**
 * Wording.
 * This model can be used to accurately describe the natural language phrase of a question or answer.
 * @see geographyWordings - examples of wordings for a geography quiz
 */
type Wording = WordingItem[];

type WordingItem = {
  type: WordingItemType;
  content: string;
}

export type WordingItemType = 'raw' | 'field';

export default Wording;