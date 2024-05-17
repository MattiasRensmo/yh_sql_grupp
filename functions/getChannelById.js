const database = require("../database/db");
const db = database.initDatabase();

const getChannelById = (cid, order = "ASC") => {
  console.log(cid, order);
  let safeOrder = "ASC";
  if (order === "DESC") safeOrder = "DESC";

  return new Promise((resolve, reject) => {
    /*sql  */
    db.all(
      `
      SELECT 
      c.channelId,
      u.userId AS channelOwnerId,
      u.username AS channelOwner,
      c.channelName,
      m.messageId,
      m.userId AS author,
      u2.username AS authorName,
      m.text,
      m.date
  FROM
      channels c
  JOIN
      users u ON c.owner = u.userId
  LEFT JOIN
      channelMessages cm ON c.channelId = cm.channelId
  LEFT JOIN
      messages m ON cm.messageId = m.messageId
  LEFT JOIN
      users u2 ON m.userId = u2.userId
          WHERE
    c.channelId = ?
  ORDER BY
      m.date ${safeOrder};
  
    `,
      [cid],
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

module.exports = getChannelById;
