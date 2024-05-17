const { initDatabase } = require("../database/db");

const db = initDatabase();

const postMessage = async (text, userId, channelid) => {
  return new Promise((resolve, reject) => {
    /*sql */
    db.serialize(() => {
      db.run(
        `
            INSERT INTO messages (text, userId) VALUES
            (?, ?)`,
        [text, userId],
        function (error) {
          if (error) {
            console.log(error);
            reject(error);
          }
          const messageId = this.lastID;
          console.log("message id", messageId);
          console.log("message posted successfully");
          /*sql*/
          channelid.map((id) => {
            db.run(
              `INSERT INTO channelMessages  (channelid, messageId) VALUES 
                            (?,?)`,
              [id, messageId],
              function (error) {
                if (error) {
                  reject(error);
                }
              }
            );
          });
          resolve(channelid, messageId);
        }
      );
    });
  });
};

//delete later
const getAllMessages = async () => {
  return new Promise((resolve, reject) => {
    /*sql*/
    db.all(`SELECT * FROM messages`, [], (error) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

//Check if found item is 1 or 0 (true or false)
const checkChannelId = (id) => {
  return new Promise((resolve, reject) => {
    /*sql*/
    const sql = `SELECT EXISTS(SELECT channelId FROM channels WHERE channelId = ?) AS channelTrue`;
    db.get(sql, [id], (err, row) => {
      if (err) {
        console.error(err);
        reject(error);
      } else {
        const foundChannel = row.channelTrue;
        resolve(foundChannel);
      }
    });
  });
};

module.exports = { postMessage, getAllMessages, checkChannelId };
