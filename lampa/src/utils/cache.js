/**
 * Кэширование плагинов
 */

const Cache = {
    async openDatabase() {
        return new Promise((resolve) => {
            resolve();
        });
    },

    async getData(category, key) {
        return new Promise((resolve) => {
            let data = localStorage.getItem(category + '_' + key);
            resolve(data ? JSON.parse(data) : null);
        });
    },

    async rewriteData(category, key, value) {
        return new Promise((resolve) => {
            try {
                localStorage.setItem(category + '_' + key, JSON.stringify(value));
                resolve();
            } catch (e) {
                resolve();
            }
        });
    },

    async removeData(category, key) {
        return new Promise((resolve) => {
            localStorage.removeItem(category + '_' + key);
            resolve();
        });
    }
};

export default Cache;
