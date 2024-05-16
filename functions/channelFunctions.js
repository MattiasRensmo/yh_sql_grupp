const database = require("../database/db");
const db = database.initDatabase();

const checkUserID = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT EXISTS(SELECT userId FROM users WHERE userId = ?) AS userExists`;
    db.get(sql, [userId], (err, row) => {
      if (err) {
        console.error(err);
        reject(error);
      } else {
        const foundUser = row.userExists;
        resolve(foundUser);
      }
    });
  });
};

const checkChannelID = (channelId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT EXISTS(SELECT channelId FROM channels WHERE channelId = ?) AS channelExists`
    db.get(sql, [channelId], function (error, row) {
        if (error) {
          console.error(error)
          return reject(error)
        }
        const foundChannel = row.channelExists
        resolve(foundChannel)
      }
    )
  })
}

const createChannel = async (channelName, userId) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO channels (owner, channelName) VALUES (?,?)",
      [userId, channelName],
      (error) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(userId, channelName);
        }
      }
    );
  });
};

module.exports = { createChannel, checkUserID, checkChannelID };
