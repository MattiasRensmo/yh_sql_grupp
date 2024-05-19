const express = require("express");
const {
  createChannel,
  checkUserID,
  checkChannelID,
  createTest,
} = require("../functions/channelFunctions");
const getChannelById = require("../functions/getChannelById");

const channel = express.Router();

function formatData(data) {
  const formatted = {
    channelId: data[0].channelId,
    channelOwnerId: data[0].channelOwnerId,
    channelOwner: data[0].channelOwner,
    channelName: data[0].channelName,
    messages: [],
  };

  data.forEach((msg) => {
    if (msg.messageId) {
      formatted.messages.push({
        messageId: msg.messageId,
        authorId: msg.author,
        authorName: msg.authorName,
        text: msg.text,
        date: msg.date,
      });
    }
  });

  return formatted;
}

//BaseURL '/api/channel'
channel.post("/", async (req, res) => {
  const { channelName, owner } = req.body;

  if (channelName == "") {
    res.status(400).send({ message: "channelname can't be left empty" });
    return;
  }

  try {
    const foundUser = await checkUserID(owner);
    console.log("foundUser", foundUser);
    if (foundUser <= 0) {
      return res.status(400).send({ message: "user does not exist" });
    }

    await createChannel(channelName, owner);

    return res
      .status(200)
      .send({ message: "channel has been created", owner: owner });
  } catch (error) {
    return res.sendStatus(500);
  }
});

channel.get("/:channelId/sortByDate/:order", async (req, res) => {
  const { channelId, order } = req.params;

  if (!(await checkChannelID(channelId)))
    return res.status(404).json({ error: "No channel found" });
  const channel = await getChannelById(channelId, order.toUpperCase());
  const responseObject = formatData(channel);
  return res.json(responseObject);
});

channel.get("/:channelId", async (req, res) => {
  const { channelId } = req.params;
  if (!(await checkChannelID(channelId)))
    return res.status(404).json({ error: "No channel found" });
  const channel = await getChannelById(channelId);
  const responseObject = formatData(channel);
  res.json(responseObject);
});

//test working delete later
// channel.post("/testcreate", async(req, res) => {
//   const {channelName, owner} = req.body;
// try {
//     await createTest(channelName, owner);
//     res.status(200).json({msg: "Okej kanal!"})
// } catch (error) {
//   return res.status(404).json({msg: "inte okej kanal!"})
// }
// })

module.exports = channel;
