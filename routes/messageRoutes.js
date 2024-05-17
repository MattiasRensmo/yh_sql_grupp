const express = require("express");
const {
  postMessage,
  getAllMessages,
  checkChannelId,
} = require("../functions/messageFunctions");
const validateSubscriber = require("../functions/validateSubscriber");
const message = express.Router();

message.use(express.json());

//BaseURL '/api/message'
message
  .get("/test", async (req, res) => {
    try {
      const allMessages = await getAllMessages();
      return res.status(200).json(allMessages);
    } catch (error) {
      return res.status(404).json({ msg: "not found :( " });
    }
  })

  .post("/", async (req, res) => {
    //add messages
    //check if user exists by checking userId...
    const { text, userId, channelId } = req.body;

    if (!userId) {
      return res.status(401).json({ msg: "No user id provided" });
    }

    for (let i = 0; i < channelId.length; i++) {
      const id = channelId[i];
      const foundChannel = await checkChannelId(id);
      if (foundChannel <= 0) {
        return res.status(404).json({ msg: "Channel not found" });
      }
      if (!(await validateSubscriber(userId, id))) {
        return res.status(401).json({ msg: "User must subscribe to channel" });
      }
    }

    try {
      await postMessage(text, userId, channelId);
      return res.status(200).json({ msg: "message posted!" });
    } catch (error) {
      return res.status(400).json({ msg: "something went wrong" });
    }
  });

module.exports = message;
