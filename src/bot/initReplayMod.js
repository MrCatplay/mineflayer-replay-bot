const fs = require('fs');
const archiver = require('archiver');
const { createSerializer, createDeserializer, states } = require('minecraft-protocol');
const { getTime } = require('../utils/timeUtils');
const { convertBufferToObject, padZeros } = require('../utils/bufferUtils');
const { createArchiveAndShutdown } = require('../utils/archive');
const { handleBotEvents } = require('./eventHandlers');
const { movement } = require('./movement');
const { convertor } = require('./convertor');
const { calculateSpeed } = require('./calculateSpeed');

global.serializer = createSerializer({ state: states.PLAY, version: '1.19.2', isServer: true });
global.deserializer = createDeserializer({ state: states.PLAY, version: '1.19.2', isServer: false });

async function initReplayMod(bot, output) {
    const outputDir = `./replay`;
    const archiveName = output
    fs.mkdirSync(outputDir, { recursive: true }); // Создаем директорию, если её нет

    global.UUID = [];
    global.replay = Buffer.from([]);
    global.lastPosition = null; // Последняя позиция бота
    global.speed = 0; // Скорость в блоках/секунду
    global.startTime = Date.now();
    global.archive = archiver("zip");

    global.metadata = {
        singleplayer: false,
        serverName: "FildBot",
        duration: 0,
        date: 0,
        mcversion: bot.version,
        fileFormat: "MCPR",
        fileFormatVersion: 14,
        protocol: 760,
        generator: "ReplayMod v1.19.2-2.6.20",
        selfId: -1,
        players: UUID,
    };

    global.Mods = { "requiredMods": [] };

    global.player = {
        spawned: false,
        clientYaw: 0,
        clientPitch: 0,
        clientX: 0,
        clientY: 0,
        clientZ: 0,
        clientUUID: null,
    };

    bot.on('move', async () => {
        await calculateSpeed(bot, lastPosition);
    });

    bot._client.on('packet', async (data, metadata, buff, fullBuffer) => {
        convertor(bot, data, metadata, buff, fullBuffer, replay, startTime);
    });

    bot.on('end', async () => {
        createArchiveAndShutdown(outputDir, archiveName)
    });

    archive.on('error', (err) => {
        console.error("Ошибка при создании архива:", err);
        throw err;
    });

    console.log("[Replay Mod] Запись началась");
}

module.exports = { initReplayMod };
