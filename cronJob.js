const { sendMessage } = require('./bot')
const { handler}  = require('./harvest')
const { AMOUNT_NOTI } = require('./config')

exports.harvestNoti = () => {
  sendMessage('Start track harvest')

  return setInterval(async () => {
          const { pendingCake, pendingCakeUsd } = await handler()

          if (pendingCake >= AMOUNT_NOTI) {
            sendMessage(`Time to havest CAKEs = ${pendingCake} ($${pendingCakeUsd})`)
          }

        }, 1800000)
}