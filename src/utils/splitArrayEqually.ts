/**
 * Divide an array into equal parts of length=splitLength and return an array of these parts
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