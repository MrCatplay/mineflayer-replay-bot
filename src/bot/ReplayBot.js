const { initReplayMod } = require('./initReplayMod');

class ReplayBot {
    constructor(bot, options) {
        if (!bot) throw new Error("Bot instance is required.");
        if (!options || !options.output) throw new Error("Output file name is required.");
    
        this.bot = bot;
        this.output = options.output;
    
        // Пример события для записи
        this.events = [];
        this.setupListeners(this.bot, this.output);
    }

    setupListeners(bot, output) {
      initReplayMod(bot, output);
    }
}

module.exports = ReplayBot;