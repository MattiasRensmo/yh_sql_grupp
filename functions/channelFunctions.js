const database = require("../database/db");
const db = database.initDatabase();

const createChannel = (channelName, userId) => {
  const sql = `SELECT EXISTS(SELECT 1 FROM users WHERE userId = ?) AS userExists`;
  db.get(sql, [userId], (err, row) => {
    if (err) {
      console.error(err);
      return;
    }
    if (row.userExists) {
      db.run(
        "INSERT INTO channels (owner, channelName) VALUES (?,?)",
        [userId, channelName],
        (error) => {
          if (error) {
            console.error(error);
            return;
          }
          console.log("New channel has been created");
        }
      );
    } else {
      console.log("user does not exist, cant create channel");
    }
  });
};

module.exports = { createChannel };
