/*
 * Перемешать массив, используя алгоритм Дурштенфельда
 */
function shuffleArray<T>(array: T[]): T[] {

    const arrayCopy = array.slice();

    for (var i = arrayCopy.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[j];
        arrayCopy[j] = temp;
    }

    return arrayCopy;
}

export default shuffleArray;