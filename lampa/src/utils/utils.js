/**
 * Утилиты для работы с плагинами и скриптами
 */

const Utils = {
    /**
     * Асинхронная загрузка скриптов
     */
    putScriptAsync(urls, random, errorCallback, successCallback, completeCallback) {
        if (!Array.isArray(urls)) urls = [urls];
        
        let loaded = 0;
        let errors = 0;
        
        urls.forEach(url => {
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url + (random ? '?v=' + Math.random() : '');
            
            script.onload = () => {
                loaded++;
                if (successCallback) successCallback(url);
                if (loaded + errors === urls.length && completeCallback) completeCallback();
            };
            
            script.onerror = () => {
                errors++;
                if (errorCallback) errorCallback(url);
                if (loaded + errors === urls.length && completeCallback) completeCallback();
            };
            
            document.head.appendChild(script);
        });
    },

    /**
     * Добавить параметр в URL
     */
    addUrlComponent(url, param) {
        let separator = url.indexOf('?') === -1 ? '?' : '&';
        return url + separator + param;
    },

    /**
     * Исправить зеркало ссылки
     */
    fixMirrorLink(url) {
        return url;
    },

    /**
     * Переписать если HTTPS
     */
    rewriteIfHTTPS(url) {
        if (window.location.protocol === 'https:' && url.indexOf('http://') === 0) {
            return url.replace('http://', 'https://');
        }
        return url;
    },

    /**
     * Получить протокол
     */
    protocol() {
        return window.location.protocol + '//';
    },

    /**
     * Генерировать UID
     */
    uid(length = 16) {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    /**
     * Копировать в буфер обмена
     */
    copyTextToClipboard(text, onSuccess, onError) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text)
                .then(() => onSuccess && onSuccess())
                .catch(() => onError && onError());
        } else {
            let textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                onSuccess && onSuccess();
            } catch (err) {
                onError && onError();
            }
            document.body.removeChild(textArea);
        }
    },

    /**
     * Проверка сенсорного устройства
     */
    isTouchDevice() {
        return (
            (typeof window !== 'undefined' &&
                ('ontouchstart' in window ||
                    (window.DocumentTouch &&
                        typeof document !== 'undefined' &&
                        document instanceof window.DocumentTouch))) ||
            (typeof navigator !== 'undefined' &&
                (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0))
        );
    },

    /**
     * Проверка PWA
     */
    isPWA() {
        return (
            window.navigator.standalone === true ||
            window.matchMedia('(display-mode: standalone)').matches
        );
    },

    /**
     * Расширить объект
     */
    extendItemsParams(items, params) {
        if (!Array.isArray(items)) return;
        items.forEach(item => {
            Object.assign(item, params);
        });
    }
};

export default Utils;
