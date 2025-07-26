# Mineflayer Replay Bot

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![Mineflayer](https://img.shields.io/badge/Mineflayer-4.0.0-blue.svg)](https://github.com/PrismarineJS/mineflayer)
[![ReplayMod](https://img.shields.io/badge/ReplayMod-Compatible-orange.svg)](https://github.com/ReplayMod/ReplayMod)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Модуль для Mineflayer, который позволяет записывать игровые сессии Minecraft в формате ReplayMod (.mcpr) для последующего воспроизведения.

## 📋 Описание

Mineflayer Replay Bot - это Node.js модуль, который интегрируется с [Mineflayer](https://github.com/PrismarineJS/mineflayer) для создания записей игровых сессий Minecraft. Модуль записывает все действия бота и сетевые пакеты, создавая файлы в формате ReplayMod, которые можно воспроизвести с помощью [ReplayMod](https://github.com/ReplayMod/ReplayMod).

### 🎯 Основные возможности

- ✅ Запись всех действий бота в реальном времени
- ✅ Захват сетевых пакетов Minecraft
- ✅ Создание файлов в формате .mcpr (ReplayMod)
- ✅ Отслеживание позиции и движения бота
- ✅ Автоматическое создание метаданных записи
- ✅ Поддержка Minecraft 1.19.2

## 🚀 Установка

### Предварительные требования

- Node.js 16+ 
- Minecraft сервер (локальный или удаленный)

### Установка модуля

```bash
npm install mineflayer-replay-bot
```

### Установка зависимостей

```bash
npm install mineflayer archiver
```

## 📖 Использование

### Базовый пример

```javascript
const mineflayer = require('mineflayer');
const ReplayBot = require('mineflayer-replay-bot');

// Создаем бота
const bot = mineflayer.createBot({
  host: 'localhost',
  port: 25565,
  username: 'ReplayBot',
  version: '1.19.2'
});

// Инициализируем запись
const replayBot = new ReplayBot(bot, {
  output: 'my_replay.mcpr'
});

// Бот готов к записи!
```

### Расширенный пример

```javascript
const mineflayer = require('mineflayer');
const ReplayBot = require('mineflayer-replay-bot');

async function startReplayBot() {
  const bot = mineflayer.createBot({
    host: 'play.example.com',
    port: 25565,
    username: 'ReplayBot',
    version: '1.19.2',
    auth: 'offline'
  });

  // Ждем подключения
  bot.once('spawn', () => {
    console.log('Бот подключился к серверу');
    
    // Начинаем запись
    const replayBot = new ReplayBot(bot, {
      output: `replay_${Date.now()}.mcpr`
    });
    
    // Пример автоматических действий
    setTimeout(() => {
      bot.chat('Привет, мир!');
    }, 2000);
    
    setTimeout(() => {
      bot.quit();
    }, 30000); // Завершаем через 30 секунд
  });

  bot.on('end', () => {
    console.log('Бот отключился, запись завершена');
  });
}

startReplayBot();
```

## 📁 Структура проекта

```
mineflayer-replay-bot/
├── src/
│   ├── bot/
│   │   ├── ReplayBot.js          # Основной класс бота
│   │   ├── initReplayMod.js      # Инициализация записи
│   │   ├── eventHandlers.js      # Обработчики событий
│   │   ├── movement.js           # Отслеживание движения
│   │   ├── convertor.js          # Конвертация пакетов
│   │   └── calculateSpeed.js     # Расчет скорости
│   ├── utils/
│   │   ├── archive.js            # Создание архива
│   │   ├── bufferUtils.js        # Утилиты для работы с буферами
│   │   └── timeUtils.js          # Утилиты времени
│   └── index.js                  # Точка входа
├── package.json
└── README.md
```

## 🔧 API

### ReplayBot

Основной класс для создания записи.

#### Конструктор

```javascript
new ReplayBot(bot, options)
```

**Параметры:**
- `bot` (Mineflayer Bot) - Экземпляр бота Mineflayer
- `options` (Object) - Опции записи
  - `output` (String) - Имя выходного файла (.mcpr)

#### Пример

```javascript
const replayBot = new ReplayBot(bot, {
  output: 'my_replay.mcpr'
});
```

## 📊 Формат выходных файлов

Модуль создает файлы в формате `.mcpr`, которые содержат:

- `recording.tmcpr` - Основные данные записи
- `metaData.json` - Метаданные записи
- `mods.json` - Информация о модах

### Метаданные записи

```json
{
  "singleplayer": false,
  "serverName": "mineflayer-replay-bot",
  "duration": 30000,
  "date": 1640995200000,
  "mcversion": "1.19.2",
  "fileFormat": "MCPR",
  "fileFormatVersion": 14,
  "protocol": 760,
  "generator": "ReplayMod v1.19.2-2.6.20",
  "selfId": -1,
  "players": []
}
```

## 🎮 Воспроизведение записей

Для воспроизведения созданных записей:

1. Установите [ReplayMod](https://github.com/ReplayMod/ReplayMod) в Minecraft
2. Скопируйте файл `.mcpr` в папку `.minecraft/replay_recordings/`
3. Запустите Minecraft с ReplayMod
4. Откройте меню ReplayMod и выберите вашу запись

## ⚙️ Конфигурация

### Поддерживаемые версии Minecraft

- Minecraft 1.19.2 (основная поддержка)
- Протокол 760

### Настройки записи

Модуль автоматически настраивает:
- Сериализатор/десериализатор пакетов
- Отслеживание позиции бота
- Расчет скорости движения
- Создание временных меток

## 🐛 Известные ограничения

- Поддерживается только Minecraft 1.19.2
- Запись работает только с одним ботом одновременно
- Требует стабильное интернет-соединение для корректной записи

## 🤝 Вклад в проект

Мы приветствуем вклад в развитие проекта! Для этого:

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. См. файл [LICENSE](LICENSE) для получения дополнительной информации.

## 🙏 Благодарности

- [Mineflayer](https://github.com/PrismarineJS/mineflayer) - За отличную библиотеку для создания Minecraft ботов
- [ReplayMod](https://github.com/ReplayMod/ReplayMod) - За формат записи и вдохновение
- [Archiver](https://github.com/archiverjs/node-archiver) - За создание ZIP архивов

## 📞 Поддержка

Если у вас есть вопросы или проблемы:

- Создайте Issue в GitHub
- Опишите проблему подробно
- Приложите логи ошибок, если они есть

---

**Автор:** MrKot  
**Версия:** 1.0.0  
**Лицензия:** MIT 