const database = require("../database/db")
const db = database.initDatabase()

const checkSusbscription = (userId, channelId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT EXISTS(SELECT 1 FROM subscribers WHERE userId = ? AND channelId = ?) AS subscriptionExists`;

        db.get(sql, [userId, channelId], function (error, row) {
                if (error) {
                    console.error(error)
                    return reject(error)
                }
                const foundSubscription = row.subscriptionExists
                resolve(foundSubscription)
            }
        )
    })
}

const newSubscriber = (userId, channelId) => {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO subscribers (channelId, userId) VALUES (?, ?)`,
            [channelId, userId], function(error) {
                if (error) {
                    console.error(error)
                    reject(error)
                } else {
                    resolve(userId, channelId)
                }
            }
        )
    })
}

module.exports = {newSubscriber, checkSusbscription}