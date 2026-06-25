/**
 * Система жанрів/категорій
 */
class Genres {
    constructor(options = {}) {
        this.container = options.container || document.getElementById('genres');
        this.navContainer = options.navContainer || document.querySelector('.header__nav');
        this.onSelect = options.onSelect || (() => {});
        this.genres = options.genres || [
            { id: 'all', name: '📺 Всі', count: 0 },
            { id: 'action', name: '💥 Екшн', count: 15 },
            { id: 'drama', name: '🎭 Драма', count: 24 },
            { id: 'comedy', name: '😂 Комедія', count: 18 },
            { id: 'horror', name: '👻 Жах', count: 12 },
            { id: 'scifi', name: '🚀 Sci-Fi', count: 20 },
            { id: 'anime', name: '🎨 Аніме', count: 35 },
            { id: 'romance', name: '💕 Романтика', count: 16 }
        ];
        this.selected = 'all';
    }

    /**
     * Рендер жанрів
     */
    render() {
        this.container.innerHTML = '';

        this.genres.forEach(genre => {
            const item = document.createElement('div');
            item.className = 'genre-item selector';
            item.dataset.genre = genre.id;
            if (genre.id === this.selected) item.classList.add('active');
            item.textContent = genre.name;
            item.addEventListener('click', () => this.select(genre.id));
            this.container.appendChild(item);
        });
    }

    /**
     * Вибір жанру
     */
    select(genreId) {
        if (this.selected === genreId) return;

        this.selected = genreId;
        this.render();
        this.onSelect(genreId);
    }

    /**
     * Отримання активного жанру
     */
    getSelected() {
        return this.selected;
    }

    /**
     * Отримання жанру за ID
     */
    getGenre(id) {
        return this.genres.find(g => g.id === id);
    }
}

// Глобальна змінна для жанрів
let genres = new Genres();
