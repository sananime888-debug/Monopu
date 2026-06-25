/**
 * Система переводов интерфейса
 */

const Lang = {
    translations: {
        ru: {
            plugin_add_success: 'Плагин успешно добавлен',
            plugin_check_fail: 'Ошибка проверки плагина',
            plugin_blocked: 'Плагин заблокирован',
            plugins_no_loaded: 'Плагины не загружены',
            plugin_loading: 'Загрузка плагина...',
            plugin_error: 'Ошибка загрузки плагина',
            plugins: 'Плагины',
            extensions: 'Расширения'
        },
        en: {
            plugin_add_success: 'Plugin added successfully',
            plugin_check_fail: 'Plugin check failed',
            plugin_blocked: 'Plugin blocked',
            plugins_no_loaded: 'Plugins not loaded',
            plugin_loading: 'Loading plugin...',
            plugin_error: 'Plugin loading error',
            plugins: 'Plugins',
            extensions: 'Extensions'
        },
        uk: {
            plugin_add_success: 'Плагін успішно додано',
            plugin_check_fail: 'Помилка перевірки плагіна',
            plugin_blocked: 'Плагін заблокований',
            plugins_no_loaded: 'Плагіни не завантажені',
            plugin_loading: 'Завантаження плагіна...',
            plugin_error: 'Помилка завантаження плагіна',
            plugins: 'Плагіни',
            extensions: 'Розширення'
        }
    },

    selected(codes) {
        let lang = localStorage.getItem('language') || 'ru';
        return codes.indexOf(lang) !== -1;
    },

    translate(key) {
        let lang = localStorage.getItem('language') || 'ru';
        return this.translations[lang]?.[key] || key;
    },

    add(obj) {
        Object.keys(obj).forEach(key => {
            ['ru', 'en', 'uk'].forEach(lang => {
                if (!this.translations[lang]) this.translations[lang] = {};
                if (obj[key][lang]) {
                    this.translations[lang][key] = obj[key][lang];
                }
            });
        });
    }
};

export default Lang;
