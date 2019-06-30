'use strict';

const Discord = require('discord.io');
const logger = require('winston');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
const bot = new Discord.Client({
    token: process.env.BOT_TOKEN,
    autorun: true
});

let prefix = '!';

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');

    prefix = `<@${bot.id}>`;

    logger.info(`Setting prefix to '${prefix}'`);
});
bot.on('message', function (user, userID, channelID, message, evt) {

    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, prefix.length) === prefix) {
        let [cmd, ...args] = message.substring(prefix.length).trim().split(' ');

        switch (cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            default:
                bot.sendMessage({
                    to: channelID,
                    message: '_meow_'
                })
        }
    }
});
