/**
 * Головна програма
 */
class App {
    constructor() {
        this.loadingEl = document.getElementById('loading');
        this.contentGrid = document.getElementById('items-grid');
        this.paginationEl = document.getElementById('pagination');

        this.currentGenre = 'all';
        this.currentPage = 1;

        this.init();
    }

    async init() {
        console.log('🚀 Ініціалізація Monopu...');

        // Налаштування жанрів
        genres.render();
        genres.onSelect = (genreId) => this.onGenreChange(genreId);

        // Завантаження контенту
        await this.loadContent(this.currentGenre, 1);

        console.log('✅ Monopu готова!');
    }

    /**
     * Завантаження контенту
     */
    async loadContent(genreId, page) {
        this.showLoading(true);

        try {
            const data = await api.getContent(genreId, page);

            this.currentGenre = genreId;
            this.currentPage = page;

            this.renderItems(data.items);
            this.renderPagination(data.total_pages, page);

            // Збереження в URL параметрах
            Utils.setQueryParam('genre', genreId);
            Utils.setQueryParam('page', page);
        } catch (error) {
            console.error('❌ Помилка завантаження:', error);
            this.showError('Помилка завантаження контенту');
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * Рендер елементів контенту
     */
    renderItems(items) {
        this.contentGrid.innerHTML = '';

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <img class="item-card__image" src="${item.image}" alt="${item.title}">
                <div class="item-card__info">
                    <h3 class="item-card__title">${item.title}</h3>
                    <p class="item-card__genre">${item.genre}</p>
                    <div class="item-card__rating">
                        <span class="item-card__rating-star">⭐</span>
                        <span>${item.rating}</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => this.playItem(item));
            this.contentGrid.appendChild(card);
        });
    }

    /**
     * Рендер пейджингу
     */
    renderPagination(totalPages, currentPage) {
        const pagination = new Pagination({
            current: currentPage,
            total: totalPages,
            container: this.paginationEl,
            onChange: (page) => this.onPageChange(page)
        });
        pagination.render();
    }

    /**
     * Відтворення елемента
     */
    playItem(item) {
        console.log('▶️ Відтворення:', item.title);
        player.play({
            title: item.title,
            subtitle: item.genre,
            url: item.url,
            playlist: item.playlist
        });
    }

    /**
     * Зміна жанру
     */
    async onGenreChange(genreId) {
        await this.loadContent(genreId, 1);
    }

    /**
     * Зміна сторінки
     */
    async onPageChange(page) {
        await this.loadContent(this.currentGenre, page);
    }

    /**
     * Показ/сховання загрузки
     */
    showLoading(show) {
        Utils.toggle(this.loadingEl, show);
    }

    /**
     * Показ помилки
     */
    showError(message) {
        alert('❌ ' + message);
    }
}

// Запуск програми при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
