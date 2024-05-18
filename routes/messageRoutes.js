const express = require("express");
const { postMessage, insertInto, postTest } = require("../functions/messageFunctions");
const validateSubscriber = require("../functions/validateSubscriber");
const { checkChannelID } = require("../functions/channelFunctions");
const message = express.Router();

message.use(express.json());

//BaseURL '/api/message'
message.post("/", async (req, res) => {
  //add messages
  //check if user exists by checking userId...
  const { text, userId, channelId } = req.body;

  if (!userId) {
    return res.status(401).json({ msg: "No user id provided" });
  }

  for (let i = 0; i < channelId.length; i++) {
    const id = channelId[i];
    const foundChannel = await checkChannelID(id);
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
})

//fungerar delete later
// .post("/potest", async (req, res) => {
//   const {text, userId, channelId} = req.body;
// try {
//     await postTest(text, userId, channelId);
    
//     res.status(200).json({ msg: "ok i think?.."})
// } catch (error) {
//   console.log("big error")
//   return res.status(404).json({ msg: "not working" })
// }
// })



module.exports = message;
