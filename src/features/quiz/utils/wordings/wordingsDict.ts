
import { SupportedDataConfigs } from '../../../../reducer/constants';
import Wording from '../../models/Wording';
import geographyWordings from './geographyWordings';

/**
 * Each data source has its own parameters for topics and question wording.
 */
const wordingsDict: Record<SupportedDataConfigs, WordingsRecord<string>> = {
  [SupportedDataConfigs.Geography]: geographyWordings,
}

export type WordingsRecord<T extends string> = {
  topics: T[];
  questionWordings: Record<T, Wording>;
  answerOptionWordings: Record<T, Wording>;
}

export default wordingsDict;