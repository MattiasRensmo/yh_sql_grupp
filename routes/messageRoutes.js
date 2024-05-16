const express = require("express");
const {
  postMessage,
  getAllMessages,
  checkChannelId,
} = require("../functions/messageFunctions");
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

  .post("/post", async (req, res) => {
    //add messages
    //check if user exists by checking userId...
    const { text, userid, channelid } = req.body;

    if (!userid) {
      return res.status(401).json({ msg: "No user id provided" });
    }

    const foundChannel = await checkChannelId(channelid);
    if (foundChannel <= 0) {
      return res.status(404).json({ msg: "Channel not found" });
    }

    try {
      await postMessage(text, userid, channelid);
      return res.status(200).json({ msg: "message posted!" });
    } catch (error) {
      return res.status(400).json({ msg: "something went wrong" });
    }
  });

module.exports = message;
