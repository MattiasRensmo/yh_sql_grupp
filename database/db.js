const sqlite = require('sqlite3').verbose()

const initDatabase = () => {
  const db = new sqlite.Database('./database/db.sqlite', (error) => {
    if (error) return console.log('Error', error)
    else return console.log('connected to db')
  })
                /*sql*/
  const users = `CREATE TABLE IF NOT EXISTS users 
                  (
                  userId INTEGER PRIMARY KEY, 
                  username VARCHAR(64) NOT NULL, 
                  password TEXT NOT NULL
                   )`
                   /*sql*/
  const channels = `CREATE TABLE IF NOT EXISTS channels 
                   (
                    channelId INTEGER PRIMARY KEY, 
                    owner INTEGER , 
                    channelName VARCHAR(64) NOT NULL,
                    FOREIGN KEY (owner) REFERENCES users(userId)
                    )`
                    /*sql*/
  const messages = `CREATE TABLE IF NOT EXISTS messages 
                    (
                      messageId INTEGER PRIMARY KEY, 
                      userId INTEGER , 
                      text TEXT NOT NULL,
                      date DATETIME NOT NULL DEFAULT(strftime('%Y-%m-%d %H:%M:%S', datetime('now'))),
                     FOREIGN KEY (userId) REFERENCES users(userId)
                     )`
                     /*sql*/
  const subscribers = `CREATE TABLE IF NOT EXISTS subscribers 
                     (
                      channelId INTEGER, 
                      userId INTEGER, 
                      FOREIGN KEY (channelId) REFERENCES channels(channelId)
                      FOREIGN KEY (userId) REFERENCES users(userId)
                      )`
                      /*sql*/
  const channelMessages = `CREATE TABLE IF NOT EXISTS channelMessages 
                      (
                       channelId INTEGER, 
                       messageId INTEGER, 
                       FOREIGN KEY (channelId) REFERENCES channels(channelId)
                       FOREIGN KEY (messageId) REFERENCES messages(messageId)
                       )`

  db.serialize(() => {
    db.run(users)
      .run(channels)
      .run(messages)
      .run(subscribers)
      .run(channelMessages)
  })

  return db
}

module.exports = { initDatabase }

// /* sql */
// let sql_user = `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, address_id INTEGER, FOREIGN KEY(address_id) REFERENCES address(id) )`
// /* sql */
// let sql_address = `CREATE TABLE IF NOT EXISTS address (id INTEGER PRIMARY KEY, street TEXT, street_num TEXT)`
// /* sql */
// let sql_view = `CREATE VIEW IF NOT EXISTS user_address_view
//                         AS SELECT
//                         users.id AS user_id,
//                         users.name AS user_name,
//                         address.street AS street,
//                         address.street_num AS address_num
//                         FROM users
//                         JOIN address ON users.address_id = address.id`

/* const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')
const path = './db.sqlite'

function createDbConnection() {
  //Skapa inte en ny databas om den redan finns utan returnera den som redan finns då.
  if (fs.existsSync(path)) return new sqlite3.Database(path)

  //Skapa ny databas
  const db = new sqlite3.Database(path, (error) => {
    if (error) return console.log(error.message)
    console.log('DB connected')
    createTable(db)
    return db
  })
}

function createTable(db) {
  db.exec(`CREATE TABLE users (
		ID INTEGER PRIMARY KEY AUTOINCREMENT, 
		insult varchar(100) NOT NULL,
		play varchar(50) NOT NULL
	)`)
}

module.exports = createDbConnection()
 */
