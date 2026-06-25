/**
 * Система хранения данных (localStorage)
 */

const Storage = {
    get(key, defaultValue) {
        try {
            let value = localStorage.getItem(key);
            return value ? JSON.parse(value) : (defaultValue || null);
        } catch (e) {
            return defaultValue || null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Storage error:', e);
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Storage error:', e);
        }
    },

    clear() {
        try {
            localStorage.clear();
        } catch (e) {
            console.error('Storage error:', e);
        }
    },

    field(key) {
        try {
            return localStorage.getItem(key) !== null;
        } catch (e) {
            return false;
        }
    }
};

export default Storage;
