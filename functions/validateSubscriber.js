const database = require("../database/db");
const db = database.initDatabase();

const validateSubscriber = (uid, cid) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM subscribers WHERE channelId = ? AND userId = ?`,
      [cid, uid],
      (error, row) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(Boolean(row.length));
        }
      }
    );
  });
};

module.exports = validateSubscriber;
