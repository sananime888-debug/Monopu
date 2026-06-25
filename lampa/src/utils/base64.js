/**
 * Base64 кодирование
 */

const Base64 = {
    encode(str) {
        try {
            return btoa(unescape(encodeURIComponent(str)));
        } catch (e) {
            return str;
        }
    },

    decode(str) {
        try {
            return decodeURIComponent(escape(atob(str)));
        } catch (e) {
            return str;
        }
    }
};

export default Base64;
