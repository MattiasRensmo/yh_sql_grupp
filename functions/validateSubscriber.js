const database = require("../database/db");
const db = database.initDatabase();

const validateSubscriber = (uid, cid) => {
  db.all(
    `SELECT * FROM subscribers WHERE channelId = ? AND userId = ?`,
    [cid, uid],
    (error, row) => {
      if (error) {
        console.log(error);
      } else {
        return Boolean(row.length);
      }
    }
  );

  return true;
};

module.exports = validateSubscriber;
