const express = require('express')
const user = express.Router()
const database = require('../database/db')
const db = database.initDatabase()

//BaseURL '/api/user'

user.post('/signup', (req, res) => {
  res.json({ msg: 'hej' })
})

user.post('/login', (req, res) => {
  res.json({ msg: 'logged in ' })
})

module.exports = user
