/**
 * Система пейджингу (lampa-source inspired)
 */
class Pagination {
    constructor(options = {}) {
        this.current = options.current || 1;
        this.total = options.total || 1;
        this.maxButtons = options.maxButtons || 7;
        this.onChange = options.onChange || (() => {});
        this.container = options.container || document.getElementById('pagination');
    }

    /**
     * Розумний розрахунок сторінок (як у lampa-source)
     * Показує: першу, останню, поточну та сусідні
     */
    getSmartPages() {
        let pages = [];

        // Завжди додаємо першу та останню сторінку
        pages.push(1);
        pages.push(this.total);

        // Додаємо поточну сторінку
        pages.push(this.current);

        // Додаємо 2 сусідні сторінки
        for (let i = 1; i <= 2; i++) {
            if (this.current - i > 1) pages.push(this.current - i);
            if (this.current + i < this.total) pages.push(this.current + i);
        }

        // Додаємо проміжні діапазони (~10%)
        let steps = Math.max(2, Math.floor(this.total / (this.maxButtons - 2)));
        for (let i = steps; i < this.total; i += steps) {
            pages.push(Math.round(i));
        }

        // Видаляємо дубікати та сортуємо
        pages = [...new Set(pages)].sort((a, b) => a - b);

        return pages;
    }

    /**
     * Рендер пейджингу з підтримкою "..."
     */
    render() {
        if (this.total <= 1) return;

        const pages = this.getSmartPages();
        let html = '';

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            const nextPage = pages[i + 1];

            // Додаємо кнопку сторінки
            html += `
                <button 
                    class="pagination__button ${page === this.current ? 'active' : ''}"
                    data-page="${page}"
                    ${page === this.current ? 'disabled' : ''}
                >
                    ${page}
                </button>
            `;

            // Якщо є розрив, додаємо "..."
            if (nextPage && nextPage - page > 1) {
                html += '<span class="pagination__ellipsis">...</span>';
            }
        }

        // Додаємо інформацію сторінки
        html += `<span class="pagination__info">${this.current} / ${this.total}</span>`;

        // Вставляємо в контейнер
        this.container.innerHTML = html;

        // Додаємо слухачі подій
        this.container.querySelectorAll('.pagination__button').forEach(button => {
            button.addEventListener('click', (e) => {
                const page = parseInt(e.target.dataset.page);
                this.goToPage(page);
            });
        });
    }

    /**
     * Перехід на сторінку
     */
    goToPage(page) {
        if (page < 1 || page > this.total || page === this.current) return;
        this.current = page;
        this.onChange(page);
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Перехід на наступну сторінку
     */
    next() {
        if (this.current < this.total) {
            this.goToPage(this.current + 1);
        }
    }

    /**
     * Перехід на попередню сторінку
     */
    prev() {
        if (this.current > 1) {
            this.goToPage(this.current - 1);
        }
    }

    /**
     * Оновлення інформації про сторінки
     */
    update(total, current) {
        this.total = total;
        this.current = Math.min(current, total);
        this.render();
    }
}
