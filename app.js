const express = require('express')
const app = express()
const harvest = require('./harvest')
const cronJob = require('./cronJob')

const port = 8080

app.get('/', async (req, res) => {
  const result = await harvest.handler()

  res.send(result)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
  cronJob.harvestNoti()
})