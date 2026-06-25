/**
 * Система событий и подписок
 */

function Subscribe() {
    let listeners = {};

    return {
        follow(name, callback) {
            if (!listeners[name]) {
                listeners[name] = [];
            }
            listeners[name].push(callback);
        },

        send(name, data) {
            if (listeners[name]) {
                listeners[name].forEach(callback => {
                    try {
                        callback(data);
                    } catch (e) {
                        console.error('Subscribe error:', e);
                    }
                });
            }
        },

        remove(name, callback) {
            if (listeners[name]) {
                listeners[name] = listeners[name].filter(cb => cb !== callback);
            }
        }
    };
}

export default Subscribe;
