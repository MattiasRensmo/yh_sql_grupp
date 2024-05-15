const express = require("express");
const { createChannel } = require("../functions/channelFunctions");
const channel = express.Router();

//BaseURL '/api/channel'
channel.post("/", async (req, res) => {
  const { channelName, userId } = req.body;
  try {
    await createChannel(channelName, userId);
    res
      .status(200)
      .send({ message: "channel has been created", owner: userId });
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = channel;
