
/**
 * Формулировка.
 * С помощью этой модели можно точно описать фразу вопроса или ответа.
 * @see geographyWordings - примеры формулировок для квиза по географии
 */
type Wording = WordingItem[];

type WordingItem = {
  type: WordingItemType;
  content: string;
}

export type WordingItemType = 'raw' | 'field';

export default Wording;