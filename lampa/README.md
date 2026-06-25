# Lampa Plugin System

Полнофункциональная система плагинов для вашего веб-приложения на основе архитектуры Lampa.

## 📁 Структура файлов

```
lampa/
├── src/
│   ├── core/
│   │   ├── plugins.js           - Основной модуль управления плагинами
│   │   ├── manifest.js          - Манифест приложения
│   │   ├── lang.js              - Система переводов
│   │   ├── component.js         - Регистрация компонентов
│   │   └── storage/
│   │       └── storage.js       - LocalStorage система
│   ├── utils/
│   │   ├── utils.js             - Утилиты
│   │   ├── subscribe.js         - Система событий
│   │   ├── cache.js             - Кэширование
│   │   ├── base64.js            - Base64 кодирование
│   │   ├── arrays.js            - Утилиты массивов
│   │   └── reguest.js           - HTTP запросы
│   └── interaction/
│       ├── template.js          - Система шаблонов
│       └── noty.js              - Уведомления
├── lampa-init.js                - Инициализация системы
├── plugins_black_list.json      - Черный список плагинов
└── README.md                    - Документация
```

## 🚀 Быстрый старт

### 1. Подключение системы плагинов

Добавьте в ваш `index.html`:

```html
<!-- Инициализация Lampa -->
<script src="lampa/lampa-init.js"></script>

<!-- Основные модули -->
<script type="module">
    import Plugins from './lampa/src/core/plugins.js';
    import Storage from './lampa/src/core/storage/storage.js';
    
    window.Lampa = {
        Plugins,
        Storage,
        // ... другие модули
    };
    
    // Инициализация
    Plugins.init();
</script>
```

### 2. Добавление плагина

```javascript
// Добавить плагин
Lampa.Plugins.add({
    url: 'https://example.com/plugin.js',
    status: 1
});

// Загрузить плагины
Lampa.Plugins.load(() => {
    console.log('Плагины загружены!');
});
```

## 📝 Создание плагина

### Простой пример плагина

```javascript
// my-plugin.js
function startPlugin() {
    window.my_plugin_ready = true;
    
    let manifest = {
        type: 'plugin',
        version: '1.0.0',
        name: 'My Plugin',
        description: 'Мой первый плагин',
        component: 'my_component'
    };
    
    Lampa.Manifest.plugins = manifest;
    
    // Регистрация компонента
    Lampa.Component.add('my_component', MyComponent);
    
    // Добавить в меню
    Lampa.Menu.addButton('Icon', 'My Plugin', () => {
        Lampa.Activity.push({
            title: 'My Plugin',
            component: 'my_component'
        });
    });
}

if (!window.my_plugin_ready) startPlugin();
```

## 🔒 Безопасность

- Черный список опасных доменов (`plugins_black_list.json`)
- Проверка статуса плагина перед загрузкой
- Base64 кодирование параметров
- Кэширование для оффлайн режима

## 🎨 Интеграция с вашим дизайном

Система полностью интегрируется с вашим существующим дизайном:
- ✅ Не изменяет HTML структуру
- ✅ Использует существующие стили
- ✅ Совместима со всеми браузерами
- ✅ Полностью модульная архитектура

## 📖 Доступные API

### Lampa.Plugins
- `init()` - Инициализация
- `add(plugin)` - Добавить плагин
- `remove(plugin)` - Удалить плагин
- `load(callback)` - Загрузить все плагины
- `get()` - Получить список плагинов

### Lampa.Storage
- `get(key, default)` - Получить значение
- `set(key, value)` - Установить значение
- `remove(key)` - Удалить значение

### Lampa.Component
- `add(name, component)` - Зарегистрировать компонент
- `get(name)` - Получить компонент

## 🐛 Отладка

Откройте консоль браузера и смотрите логи:

```javascript
console.log('Plugins:', Lampa.Plugins.get());
console.log('Loaded:', Lampa.Plugins.loaded());
console.log('Errors:', Lampa.Plugins.errors());
```

## 📄 Лицензия

GNU General Public License v2.0

## 🤝 Поддержка

Для вопросов и помощи: https://github.com/yumata/lampa-source
