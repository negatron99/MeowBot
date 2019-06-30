
try {
  require("./../bot.dev.js");
} catch (e) {
  if (process.env.BOT_TOKEN === undefined) {
    throw new Error("BOT_TOKEN is not defined in environment");
  }
}

require("./bot");
