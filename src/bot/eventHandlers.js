function handleBotEvents(bot, replay, archive, startTime) {
    bot.on('move', async () => {
        await calculateSpeed();
        if (speed.toFixed(2) <= 0.1) {
            player.clientX = bot.entity.position.x
            player.clientY = bot.entity.position.y
            player.clientZ = bot.entity.position.z
        }
    });

    bot.on('end', () => {
        createArchiveAndShutdown()
    })
}

module.exports = { handleBotEvents };
