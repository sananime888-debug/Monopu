/**
 * Система плеєра (lampa-source inspired)
 */
class Player {
    constructor(options = {}) {
        this.modal = document.getElementById('player-modal');
        this.video = document.getElementById('video');
        this.playBtn = document.getElementById('player-play');
        this.closeBtn = document.getElementById('player-close');
        this.rangeInput = document.getElementById('player-range');
        this.volumeInput = document.getElementById('player-volume');
        this.progressBar = document.getElementById('player-progress');
        this.bufferedBar = document.getElementById('player-buffered');
        this.currentTimeEl = document.getElementById('player-current');
        this.durationEl = document.getElementById('player-duration');
        this.titleEl = document.getElementById('player-title');
        this.subtitleEl = document.getElementById('player-subtitle');
        this.playlistEl = document.getElementById('player-playlist');
        this.muteBtn = document.getElementById('player-mute');
        this.fullscreenBtn = document.getElementById('player-fullscreen');

        this.playlist = [];
        this.currentIndex = 0;
        this.isPlaying = false;

        this.init();
    }

    init() {
        // Слухачі для відео
        this.video.addEventListener('play', () => this.onPlay());
        this.video.addEventListener('pause', () => this.onPause());
        this.video.addEventListener('timeupdate', () => this.onTimeUpdate());
        this.video.addEventListener('loadedmetadata', () => this.onMetadataLoaded());
        this.video.addEventListener('progress', () => this.onProgress());
        this.video.addEventListener('ended', () => this.onEnded());

        // Кнопки
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.closeBtn.addEventListener('click', () => this.close());
        this.muteBtn.addEventListener('click', () => this.toggleMute());
        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

        // Контролі часу та гучності
        this.rangeInput.addEventListener('input', (e) => this.seek(e.target.value));
        this.volumeInput.addEventListener('input', (e) => this.setVolume(e.target.value));

        // Клавіатурні скорочення
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    /**
     * Відкриття плеєра та відтворення
     */
    play(data) {
        this.currentData = data;
        this.video.src = data.url;
        this.titleEl.textContent = data.title || 'Плеєр';
        this.subtitleEl.textContent = data.subtitle || data.genre || '';

        if (data.playlist && Array.isArray(data.playlist)) {
            this.setupPlaylist(data.playlist);
        }

        Utils.toggle(this.modal, true);
        this.video.play();
    }

    /**
     * Налаштування плейліста
     */
    setupPlaylist(items) {
        this.playlist = items;
        this.playlistEl.innerHTML = '';

        items.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'player__playlist-item';
            if (index === this.currentIndex) div.classList.add('active');
            div.textContent = item.title || `Епізод ${index + 1}`;
            div.addEventListener('click', () => this.playItem(index));
            this.playlistEl.appendChild(div);
        });
    }

    /**
     * Відтворення елемента з плейліста
     */
    playItem(index) {
        if (index >= 0 && index < this.playlist.length) {
            this.currentIndex = index;
            const item = this.playlist[index];
            this.video.src = item.url;
            this.titleEl.textContent = item.title;
            this.video.play();
            this.updatePlaylistUI();
        }
    }

    /**
     * Оновлення UI плейліста
     */
    updatePlaylistUI() {
        this.playlistEl.querySelectorAll('.player__playlist-item').forEach((item, index) => {
            item.classList.toggle('active', index === this.currentIndex);
        });
    }

    /**
     * Перехід на наступний трек
     */
    next() {
        if (this.currentIndex < this.playlist.length - 1) {
            this.playItem(this.currentIndex + 1);
        }
    }

    /**
     * Перехід на попередній трек
     */
    prev() {
        if (this.currentIndex > 0) {
            this.playItem(this.currentIndex - 1);
        }
    }

    /**
     * Показ/сховання плеєра
     */
    togglePlay() {
        if (this.isPlaying) {
            this.video.pause();
        } else {
            this.video.play();
        }
    }

    onPlay() {
        this.isPlaying = true;
        this.playBtn.textContent = '⏸';
    }

    onPause() {
        this.isPlaying = false;
        this.playBtn.textContent = '▶';
    }

    /**
     * Оновлення часу
     */
    onTimeUpdate() {
        const percent = (this.video.currentTime / this.video.duration) * 100;
        this.progressBar.style.width = percent + '%';
        this.rangeInput.value = percent;
        this.currentTimeEl.textContent = Utils.secondsToTime(this.video.currentTime);
    }

    /**
     * Завантажено метаданні
     */
    onMetadataLoaded() {
        this.durationEl.textContent = Utils.secondsToTime(this.video.duration);
        this.rangeInput.max = 100;
    }

    /**
     * Оновлення буферизації
     */
    onProgress() {
        if (this.video.buffered.length > 0) {
            const bufferedEnd = this.video.buffered.end(this.video.buffered.length - 1);
            const percent = (bufferedEnd / this.video.duration) * 100;
            this.bufferedBar.style.width = percent + '%';
        }
    }

    /**
     * Завершення відео
     */
    onEnded() {
        if (this.currentIndex < this.playlist.length - 1) {
            this.next();
        }
    }

    /**
     * Переміщення по часовій шкалі
     */
    seek(percent) {
        const time = (percent / 100) * this.video.duration;
        this.video.currentTime = time;
    }

    /**
     * Налаштування гучності
     */
    setVolume(volume) {
        this.video.volume = volume / 100;
        this.updateMuteButton();
    }

    /**
     * Вмикання/вимикання звуку
     */
    toggleMute() {
        if (this.video.muted) {
            this.video.muted = false;
        } else {
            this.video.muted = true;
        }
        this.updateMuteButton();
    }

    updateMuteButton() {
        if (this.video.muted || this.video.volume === 0) {
            this.muteBtn.textContent = '🔇';
        } else if (this.video.volume < 0.5) {
            this.muteBtn.textContent = '🔉';
        } else {
            this.muteBtn.textContent = '🔊';
        }
    }

    /**
     * Повноекранний режим
     */
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.modal.requestFullscreen().catch(err => {
                alert(`Помилка: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    /**
     * Обробка клавіш
     */
    handleKeyPress(e) {
        if (!Utils.toggle(this.modal, undefined) === false) return; // Якщо плеєр не видимий

        switch (e.code) {
            case 'Space':
                e.preventDefault();
                this.togglePlay();
                break;
            case 'ArrowRight':
                this.video.currentTime += 5;
                break;
            case 'ArrowLeft':
                this.video.currentTime -= 5;
                break;
            case 'KeyN':
                this.next();
                break;
            case 'KeyP':
                this.prev();
                break;
            case 'Escape':
                this.close();
                break;
            case 'KeyF':
                this.toggleFullscreen();
                break;
        }
    }

    /**
     * Закриття плеєра
     */
    close() {
        this.video.pause();
        this.video.src = '';
        Utils.toggle(this.modal, false);
    }
}

// Глобальна змінна для плеєра
let player = new Player();
