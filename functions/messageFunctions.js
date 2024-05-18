const { initDatabase } = require("../database/db");
const { post } = require("../routes/userRoutes");
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
              `INSERT INTO channelMessages  (channelId, messageId) VALUES 
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


const postTest = async (text, userId, channelid) => {
  return new Promise(async(resolve, reject) => {
   try {
    const textValue = text;
    const id = userId;

   const latest_id = await insertInto("messages", ["text", "userId"], [textValue, id]);
    console.log("latest_id", latest_id);
    insertInto("channelMessages", ["channelId", "messageId"],[channelid, latest_id]);
   resolve();
   } catch (error) {
    console.error("failed insert", error)
    reject(error);
   }
  })

}


const insertInto = async (table, columns, values) => {
  let last_id;
  /*sql*/
  const placeholders = columns.map(() => "?").join(",");
  const sql = `INSERT INTO ${table} (${columns.join(",")}) VALUES (${placeholders})`;
  try {
    last_id = await new Promise(async (resolve, reject) => {
      db.run(sql, values, async function(error){
        if (error) {
          console.log(error);
          reject(error)
        }else{
          const lastId = await this.lastID;
          console.log("last_id1", lastId);
          resolve(lastId);
        }
      })
    })
  } catch (error) {
    console.error("Inserting error", error)
  }
  console.log("last_id2", last_id)
  return last_id;
}

module.exports = { postMessage, insertInto, postTest };
