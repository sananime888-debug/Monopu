/**
 * Утилиты для работы с массивами
 */

const Arrays = {
    remove(array, item) {
        let index = array.indexOf(item);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
    },

    clone(array) {
        if (!Array.isArray(array)) return array;
        return JSON.parse(JSON.stringify(array));
    },

    extend(target, source) {
        Object.assign(target, source);
        return target;
    },

    decodeJson(str, defaultValue = {}) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return defaultValue;
        }
    }
};

export default Arrays;
