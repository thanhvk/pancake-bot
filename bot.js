const { Telegram } = require('telegraf')
const config = require('./config')

const bot = new Telegram(config.TOKEN)

exports.sendMessage = (msg) => {
  bot.sendMessage(config.CHAT_ID, msg)
}