/**
 * Система уведомлений
 */

const Noty = {
    show(message, options = {}) {
        console.log('Notification:', message);
        
        let time = options.time || 3000;
        let noty = document.createElement('div');
        noty.className = 'lampa-noty';
        noty.textContent = message;
        noty.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #333;
            color: #fff;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            max-width: 300px;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(noty);
        
        setTimeout(() => {
            noty.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(noty);
            }, 300);
        }, time);
    },

    render() {
        let style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        return document.createElement('div');
    }
};

export default Noty;
