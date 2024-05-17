const database = require("../database/db");
const db = database.initDatabase();

const createUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, password],
      function (error) {
        if (error) {
          reject("user couldn't be created", error);
        }
        resolve(this.lastID);
      }
    );
  });
};

module.exports = { createUser };
