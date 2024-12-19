/**
 * Получить случайное целое число от 0 до max
 */
const getRandomInteger = (max: number) => {
    const randomFloat = Math.random() * max;

    return Math.random() > 0.5 
        ? Math.floor(randomFloat) 
        : Math.ceil(randomFloat);
}

export default getRandomInteger;