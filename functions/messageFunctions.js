const { initDatabase } = require("../database/db");
const db = initDatabase();

//fungerar
const postMessage = async (text, userId, channelid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const textValue = text;
      const id = userId;

      const latest_id = await insertInto(
        "messages",
        ["text", "userId"],
        [textValue, id]
      );
      channelid.map((id) => {
        insertInto(
          "channelMessages",
          ["channelId", "messageId"],
          [id, latest_id]
        );
      });
      resolve();
    } catch (error) {
      console.error("failed insert", error);
      reject(error);
    }
  });
};

//main insert function
//returns a "lastID"
//add table "messages"
//add targeted columns "text, userId"
//add "values" "Jag gillar hestar, 1"
// INSERT INTO "messages" (text, userId) VALUES ("jag gillar hestar", 1)
const insertInto = async (table, columns, values) => {
  let last_id;
  /*sql*/
  const placeholders = columns.map(() => "?").join(",");
  const sql = `INSERT INTO ${table} (${columns.join(
    ","
  )}) VALUES (${placeholders})`;
  try {
    last_id = await new Promise(async (resolve, reject) => {
      db.run(sql, values, async function (error) {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          const lastId = await this.lastID;
          resolve(lastId);
        }
      });
    });
  } catch (error) {
    console.error("Inserting error", error);
  }
  return last_id;
};

module.exports = { postMessage, insertInto };
