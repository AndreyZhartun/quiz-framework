/**
 * Поделить массив на равные части длиной splitLength и вернуть массив этих частей
 */
function splitArrayEqually<T>(
  array: T[],
  splitLength = 5,
): (T[])[] {

  let startSliceIndex = 0;

  const output: (T[])[] = [];

  while (array[startSliceIndex]) {
    output.push(
      array.slice(startSliceIndex, startSliceIndex + splitLength),
    )

    startSliceIndex += splitLength;
  }

  return output;
}

export default splitArrayEqually;