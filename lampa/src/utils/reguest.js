/**
 * HTTP запросы
 */

class Request {
    constructor() {
        this.timeout = 5000;
        this.headers = {};
    }

    silent(url, onSuccess, onError, post, params = {}) {
        this.request(url, onSuccess, onError, post, params);
    }

    native(url, onSuccess, onError, post, params = {}) {
        this.request(url, onSuccess, onError, post, params);
    }

    quiet(url, onSuccess, onError, post) {
        this.request(url, onSuccess, onError, post);
    }

    request(url, onSuccess, onError, post, params = {}) {
        let xhr = new XMLHttpRequest();
        let timeoutId = setTimeout(() => {
            xhr.abort();
            if (onError) onError('timeout');
        }, params.timeout || this.timeout);

        xhr.onload = () => {
            clearTimeout(timeoutId);
            try {
                let response = params.dataType === 'text' ? xhr.responseText : JSON.parse(xhr.responseText);
                if (onSuccess) onSuccess(response);
            } catch (e) {
                if (onError) onError(e);
            }
        };

        xhr.onerror = () => {
            clearTimeout(timeoutId);
            if (onError) onError('error');
        };

        xhr.open(post ? 'POST' : 'GET', url, true);
        xhr.send();
    }

    clear() {
        // Clear cache if needed
    }

    errorDecode(error, code) {
        return 'Request error: ' + (error || 'unknown');
    }
}

export default Request;
