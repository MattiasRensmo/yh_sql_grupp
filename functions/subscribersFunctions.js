const database = require("../database/db");
const { insertInto } = require("./messageFunctions");
const db = database.initDatabase();

const checkSubscription = (userId, channelId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT EXISTS(SELECT 1 FROM subscribers WHERE userId = ? AND channelId = ?) AS subscriptionExists`;

    db.get(sql, [userId, channelId], function (error, row) {
      if (error) {
        console.error(error);
        return reject(error);
      }
      const foundSubscription = row.subscriptionExists;
      resolve(foundSubscription);
    });
  });
};

const newSubscriber = async (userId, channelId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user_id = userId;
      const channel_id = channelId;
      await insertInto(
        "subscribers",
        ["userId", "channelId"],
        [user_id, channel_id]
      );
      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

module.exports = { newSubscriber, checkSubscription };
