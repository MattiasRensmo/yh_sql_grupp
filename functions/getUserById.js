const e = require("express");
const database = require("../database/db");
const db = database.initDatabase();

const getUserById = (uid) => {
  //hämta en användare
  //(inkl vilka kanaler hen prenumererar på och vilka hen äger) *
  return new Promise((resolve, reject) => {
    db.all(
      /*sql  */
      `
    SELECT
    u.userId,
    u.username,
    c.channelId AS owned_channel_id,
    c.channelName AS owned_channel_name,
    s.channelId AS subscribed_channel_id,
    ch.channelName AS subscribed_channel_name
    FROM
    users u
    LEFT JOIN
    channels c ON u.userId = c.owner
    LEFT JOIN
    subscribers s ON u.userId = s.userId
    LEFT JOIN
    channels ch ON s.channelId = ch.channelId
    WHERE
    u.userId = ?;
    `,
      [uid],
      (error, dbRes) => {
        if (error) {
          reject(error);
        } else {
          resolve(dbRes);
        }
      }
    );
  });
};

module.exports = getUserById;
