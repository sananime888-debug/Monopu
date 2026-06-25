/**
 * Утиліти
 */
const Utils = {
    /**
     * Форматування часу з секунд у HH:MM:SS
     */
    secondsToTime(seconds) {
        seconds = Math.floor(seconds);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
        return `${minutes}:${String(secs).padStart(2, '0')}`;
    },

    /**
     * Затримка (Promise)
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Дебаунс
     */
    debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    /**
     * Отримання URL параметра
     */
    getQueryParam(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    },

    /**
     * Встановлення URL параметра
     */
    setQueryParam(param, value) {
        const params = new URLSearchParams(window.location.search);
        params.set(param, value);
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    },

    /**
     * Показання/приховування елемента
     */
    toggle(element, show) {
        if (show === undefined) {
            element.classList.toggle('hidden');
        } else if (show) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    },

    /**
     * Мововідповідність
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Валідація URL
     */
    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }
};
