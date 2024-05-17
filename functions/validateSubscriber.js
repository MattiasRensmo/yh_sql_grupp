const database = require("../database/db");
const db = database.initDatabase();

const validateSubscriber = (uid, cid) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM subscribers WHERE channelId = ? AND userId = ?`,
      [cid, uid],
      (error, row) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log(Boolean(row.length));
          resolve(Boolean(row.length));
        }
      }
    );
  });
};

module.exports = validateSubscriber;
