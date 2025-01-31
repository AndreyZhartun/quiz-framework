
/**
 * Формулировка
 */
type Wording = WordingItem[];

type WordingItem = {
  type: WordingItemType;
  content: string;
}

export type WordingItemType = 'raw' | 'field';

export default Wording;