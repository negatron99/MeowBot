'use strict';


import * as logger from 'winston';
import {Client} from "discord.js";
import {format} from "winston";

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console({
  level: 'debug',
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.simple()
  )
}));

// Initialize Discord Bot
const bot = new Client();

let prefix = '!';

bot.on('ready', () => {
  const {user} = bot;
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(user.username + ' - (' + user.id + ')');

  prefix = `<@${user.id}>`;

  logger.info(`Setting prefix to '${prefix}'`);
});
bot.on('message', (message) => {

  const {content, channel} = message;

  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  if (content.substring(0, prefix.length) === prefix) {
    let [cmd, ...args] = content.substring(prefix.length).trim().split(' ');

    switch (cmd) {
      // !ping
      case 'ping':
        channel.send('Pong!');
        break;
      default:
        channel.send('_meow_');
    }
  }
});

bot.login(process.env.BOT_TOKEN);
 