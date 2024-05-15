const express = require('express')
const channel = express.Router()

//BaseURL '/api/channel'
channel.post('/', (req, res) => {
  res.json({ msg: 'bra kanal' })
})

module.exports = channel
