const express = require('express')
const user = express.Router()
const { createUser } = require('../functions/userFunctions')
const getUserById = require('../functions/getUserById')

//BaseURL '/api/user'
user.post('/signup', async (req, res) => {
  const { username, password } = req.body

  if (username == '' || password == '') {
    res.status(400).send({ message: 'username or password cannot be empty' })
    return
  }

  try {
    await createUser(username, password)
    res.status(200).send({ message: 'user successfully created' })
  } catch (error) {
    res.sendStatus(500)
  }
})

user.get('/:id', async (req, res) => {
  try {
    const uid = req.params.id
    const user = await getUserById(uid)
    if (user.length < 1)
      return res.status(404).json({ error: 'User does not exist' })

    //Vi måste göra ett fint Json-obj från db-svaret
    const userObject = {
      userId: user[0].userId,
      username: user[0].username,
      owns: [],
      subs: [],
    }

    user.forEach((row) => {
      const ownerExists = userObject.owns.findIndex(
        (element) => element.id == row.owned_channel_id
      )

      const subscriberExists = userObject.subs.findIndex(
        (element) => element.id == row.subscribed_channel_id
      )

      if (row.owned_channel_id && ownerExists < 0) {
        userObject.owns.push({
          id: row.owned_channel_id,
          name: row.owned_channel_name,
        })
      }
      if (row.subscribed_channel_id && subscriberExists < 0) {
        userObject.subs.push({
          id: row.subscribed_channel_id,
          name: row.subscribed_channel_name,
        })
      }
    })
    console.log(user)
    res.json(userObject)
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' })
  }
})

user.post('/login', (req, res) => {
  res.json({ msg: 'logged in ' })
})

module.exports = user
