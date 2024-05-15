const database = require("../database/db");
const db = database.initDatabase();

const createUser = async (username, password) => {
  return db.run(
    "INSERT INTO users (username, password) VALUES (?,?)",
    [username, password],
    (error) => {
      if (error) {
        console.log("user couldn't be created", error);
      }
    }
  );
};

module.exports = { createUser };
