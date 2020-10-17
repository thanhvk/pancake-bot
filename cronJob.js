const bot = require('./bot')

setInterval(async () => {
  const result = await havest.handler()

  if (result.pendingCake >= 50) {
    bot.sendMessage(`Time to havest pending cake is: ${result.pendingCacke}`)
  }

  res.send(result)
}, 1800000)