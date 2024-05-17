const sqlite = require("sqlite3").verbose();

const initDatabase = () => {
  const db = new sqlite.Database("./database/db.sqlite", (error) => {
    if (error) return console.log("Error", error);
  });
  /*sql*/
  const users = `CREATE TABLE IF NOT EXISTS users 
                  (
                  userId INTEGER PRIMARY KEY, 
                  username VARCHAR(64) NOT NULL, 
                  password TEXT NOT NULL
                   )`;
  /*sql*/
  const channels = `CREATE TABLE IF NOT EXISTS channels 
                   (
                    channelId INTEGER PRIMARY KEY, 
                    owner INTEGER , 
                    channelName VARCHAR(64) NOT NULL,
                    FOREIGN KEY (owner) REFERENCES users(userId)
                    )`;
  /*sql*/
  const messages = `CREATE TABLE IF NOT EXISTS messages 
                    (
                      messageId INTEGER PRIMARY KEY, 
                      userId INTEGER , 
                      text TEXT NOT NULL,
                      date DATETIME NOT NULL DEFAULT(strftime('%Y-%m-%d %H:%M:%S', datetime('now'))),
                     FOREIGN KEY (userId) REFERENCES users(userId)
                     )`;
  /*sql*/
  const subscribers = `CREATE TABLE IF NOT EXISTS subscribers 
                     (
                      channelId INTEGER, 
                      userId INTEGER, 
                      FOREIGN KEY (channelId) REFERENCES channels(channelId)
                      FOREIGN KEY (userId) REFERENCES users(userId)
                      )`;
  /*sql*/
  const channelMessages = `CREATE TABLE IF NOT EXISTS channelMessages 
                      (
                       channelId INTEGER, 
                       messageId INTEGER, 
                       FOREIGN KEY (channelId) REFERENCES channels(channelId)
                       FOREIGN KEY (messageId) REFERENCES messages(messageId)
                       )`;

  db.serialize(() => {
    db.run(users)
      .run(channels)
      .run(messages)
      .run(subscribers)
      .run(channelMessages);
  });

  return db;
};

module.exports = { initDatabase };
