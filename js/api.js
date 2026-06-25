/**
 * API для завантаження контенту
 */
class ContentAPI {
    constructor(options = {}) {
        this.baseUrl = options.baseUrl || '/api';
        this.cache = {};
    }

    /**
     * Отримання контенту за жанром та сторінкою
     */
    async getContent(genreId, page = 1) {
        const cacheKey = `${genreId}_${page}`;

        // Перевірка кешу
        if (this.cache[cacheKey]) {
            return this.cache[cacheKey];
        }

        // Імітація API запиту (заміни на реальний API)
        const response = await this.mockFetch(genreId, page);
        this.cache[cacheKey] = response;
        return response;
    }

    /**
     * Імітація API запиту (для демонстрації)
     */
    async mockFetch(genreId, page = 1) {
        await Utils.delay(800); // Імітація затримки мережі

        const mockData = {
            all: this.generateMockItems(100),
            action: this.generateMockItems(60, 'Action'),
            drama: this.generateMockItems(72, 'Drama'),
            comedy: this.generateMockItems(54, 'Comedy'),
            horror: this.generateMockItems(36, 'Horror'),
            scifi: this.generateMockItems(60, 'Sci-Fi'),
            anime: this.generateMockItems(105, 'Anime'),
            romance: this.generateMockItems(48, 'Romance')
        };

        const items = mockData[genreId] || mockData.all;
        const itemsPerPage = 12;
        const totalPages = Math.ceil(items.length / itemsPerPage);
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        return {
            items: items.slice(start, end),
            page,
            total_pages: totalPages,
            total_items: items.length
        };
    }

    /**
     * Генерація mock елементів
     */
    generateMockItems(count, genre = 'All') {
        const titles = [
            'Блакитна Сльоза', 'Небесна Гавань', 'Зоряний Шлях', 'Легенда Драконів',
            'Чорна Пантера', 'Нео Токіо', 'Підземна Держава', 'Вихід з Матриці',
            'Майстер Ночі', 'Острів Скарбів', 'Космічна Одісея', 'Час Героїв',
            'Полум\'яниця Серця', 'Сніжна Королева', 'Переривач Хвиль', 'Лицар Справедливості'
        ];

        const items = [];
        for (let i = 0; i < count; i++) {
            items.push({
                id: i + 1,
                title: titles[i % titles.length] + ` ${Math.floor(i / titles.length + 1)}`,
                genre: genre,
                rating: (Math.random() * 2 + 7).toFixed(1),
                image: `https://via.placeholder.com/200x250?text=${encodeURIComponent(titles[i % titles.length])}`,
                url: `https://test-streams.com/video${i + 1}.mp4`,
                playlist: this.generatePlaylist()
            });
        }
        return items;
    }

    /**
     * Генерація плейліста для кожного фільму
     */
    generatePlaylist() {
        const episodes = [];
        for (let i = 1; i <= 3; i++) {
            episodes.push({
                title: `Епізод ${i}`,
                url: `https://test-streams.com/episode${i}.mp4`,
                duration: Math.floor(Math.random() * 3600) + 1200
            });
        }
        return episodes;
    }
}

// Глобальна змінна для API
let api = new ContentAPI();
