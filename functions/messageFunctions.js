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

module.exports = { postMessage };
