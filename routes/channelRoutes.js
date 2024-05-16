const express = require("express");
const { createChannel, checkUserID } = require("../functions/channelFunctions");
const channel = express.Router();

//BaseURL '/api/channel'
channel.post("/", async (req, res) => {
  const { channelName, userId } = req.body;

  if (channelName == "") {
    res.status(400).send({ message: "channelname can't be left empty" });
    return;
  }

  try {
    const foundUser = await checkUserID(userId);
    console.log("foundUser", foundUser);
    if (foundUser <= 0) {
      return res.status(400).send({ message: "user does not exist" });
    }

    await createChannel(channelName, userId);

    return res
      .status(200)
      .send({ message: "channel has been created", owner: userId });
  } catch (error) {
    return res.sendStatus(500);
  }
});

module.exports = channel;
