/**
 * Получить случайный UUID
 */
const getUUID = () => {
    if (crypto.hasOwnProperty('randomUUID')) {
        return crypto.randomUUID();
    }

    /**
     * fallback для старых браузеров
     */
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

export default getUUID;