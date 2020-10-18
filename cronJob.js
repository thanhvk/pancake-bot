const bot = require('./bot')
const harvest = require('./harvest')
const config = require('./config')

exports.harvestNoti = () => {
  bot.sendMessage('Start track harvest')

  return setInterval(async () => {
          const result = await harvest.handler()

          if (result.pendingCake >= config.AMOUNT_NOTI) {
            bot.sendMessage(`Time to havest pending cake is: ${result.pendingCacke}`)
          }

        }, 1800000)
}