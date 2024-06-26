const database = require("../database/db");
const { insertInto } = require("./messageFunctions");
const db = database.initDatabase();

const checkUserID = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT EXISTS(SELECT userId FROM users WHERE userId = ?) AS userExists`;
    db.get(sql, [userId], (err, row) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        const foundUser = row.userExists;
        resolve(foundUser);
      }
    });
  });
};

const checkChannelID = (channelId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT EXISTS(SELECT channelId FROM channels WHERE channelId = ?) AS channelExists`;
    db.get(sql, [channelId], function (error, row) {
      if (error) {
        console.error(error);
        return reject(error);
      }
      const foundChannel = row.channelExists;
      resolve(foundChannel);
    });
  });
};

const createChannel = async (channelName, userId) => {
  // insertInto("subscribers", ["channelId", userId], [channelName, userId])
  return new Promise(async (resolve, reject) => {
    try {
      const textValue = channelName;
      const id = userId;

      const latest_id = await insertInto(
        "channels",
        ["owner", "channelName"],
        [id, textValue]
      );
      await insertInto(
        "subscribers",
        ["channelId", "userId"],
        [latest_id, userId]
      );
      resolve();
    } catch (error) {
      console.error("failed insert", error);
      reject(error);
    }
  });
};

module.exports = { createChannel, checkUserID, checkChannelID };
