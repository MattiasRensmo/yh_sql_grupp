const express = require('express')
const message = express.Router()

//BaseURL '/api/message'
message.get('/', (req, res) => {
  res.json({ msg: 'bra message' })
})

module.exports = message
