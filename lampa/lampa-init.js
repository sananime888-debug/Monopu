/**
 * Инициализация Lampa Plugin System
 */

(function() {
    // Настройки приложения
    if (typeof window.lampa_settings === 'undefined') {
        window.lampa_settings = {};
    }

    Object.assign(window.lampa_settings, {
        // Использовать плагины
        plugins_use: true,
        // Магазин плагинов
        plugins_store: true,
        // Аккаунты
        account_use: true,
        // Синхронизация
        account_sync: true,
        // Отключенные функции
        disable_features: {
            blacklist: false,
            reactions: false,
            discuss: false,
            ai: false,
            subscribe: false,
            persons: false,
            ads: false,
            trailers: false,
            install_proxy: false,
            remote_configuration: false,
            dmca: false,
            lgbt: false
        }
    });

    console.log('Lampa Plugin System initialized');
})();
