const express = require('express')
const app = express()
const havest = require('./havest')

const port = 8082

app.get('/', async (req, res) => {
  const result = await havest.handler()

  res.send(result)
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))