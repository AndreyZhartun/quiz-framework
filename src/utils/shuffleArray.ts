/*
 * Shuffle an array (Fisher–Yates shuffle).
 * The array of keys is shuffled and N elements are selected from the beginning of the array, where N is the number of needed elements.
 */
function shuffleArray<T>(array: T[]): T[] {

  const arrayCopy = array.slice();

  for (let i = arrayCopy.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arrayCopy[i];
    arrayCopy[i] = arrayCopy[j];
    arrayCopy[j] = temp;
  }

  return arrayCopy;
}

export default shuffleArray;