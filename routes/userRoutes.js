const express = require("express");
const user = express.Router();
const { createUser } = require("../functions/userFunctions");
const getUserById = require("../functions/getUserById");
const {
  checkSubscription,
  newSubscriber,
} = require("../functions/subscribersFunctions");
const {
  checkUserID,
  checkChannelID,
} = require("../functions/channelFunctions");

//BaseURL '/api/user'
user.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (username == "" || password == "") {
    res.status(400).send({
      message: "username or password cannot be empty",
    });
    return;
  }

  try {
    const userId = await createUser(username, password);
    res.status(200).send({ message: "user successfully created", userId });
  } catch (error) {
    res.sendStatus(500);
  }
});

user.get("/:id", async (req, res) => {
  try {
    const uid = req.params.id;
    const user = await getUserById(uid);
    if (user.length < 1)
      return res.status(404).json({ error: "User does not exist" });

    //Vi måste göra ett fint Json-obj från db-svaret
    const userObject = {
      userId: user[0].userId,
      username: user[0].username,
      owns: [],
      subs: [],
    };

    user.forEach((row) => {
      const ownerExists = userObject.owns.findIndex(
        (element) => element.id == row.owned_channel_id
      );

      const subscriberExists = userObject.subs.findIndex(
        (element) => element.id == row.subscribed_channel_id
      );

      if (row.owned_channel_id && ownerExists < 0) {
        userObject.owns.push({
          id: row.owned_channel_id,
          name: row.owned_channel_name,
        });
      }
      if (row.subscribed_channel_id && subscriberExists < 0) {
        userObject.subs.push({
          id: row.subscribed_channel_id,
          name: row.subscribed_channel_name,
        });
      }
    });
    res.json(userObject);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

user.post("/login", (req, res) => {
  res.json({ msg: "logged in " });
});

// Skapa prenumerationer
user.post("/:userId/sub/:channelId", async (req, res) => {
  const { userId, channelId } = req.params;

  try {
    const userExists = await checkUserID(userId);
    if (!userExists) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const channelExists = await checkChannelID(channelId);
    if (!channelExists) {
      return res.status(400).json({ message: "Channel does not exist" });
    }

    const subscriptionExists = await checkSubscription(userId, channelId);
    if (subscriptionExists) {
      return res.status(500).json({ message: "Subscription already exists" });
    }

    const subscription = await newSubscriber(userId, channelId);
    return res.status(201).json({
      message: `Successfully subscribed user with id ${userId} to channel with id ${channelId}`,
      subscription,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to subscribe" });
  }
});

module.exports = user;
