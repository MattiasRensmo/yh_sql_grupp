const express = require("express");
const user = require("./routes/userRoutes");
const channel = require("./routes/channelRoutes");
const message = require("./routes/messageRoutes");
const database = require("./database/db");
const db = database.initDatabase();
const app = express();
const PORT = 5000;
const URL = "localhost";

app.use(express.json());

app.get("/api/test", (req, res) => {
  //Detta är oxå bara för att testa. OBS det hämtar från messages§
  db.all(
    `SELECT * FROM subscribers WHERE channelId = 4 AND userId = 1`,
    (error, row) => {
      if (error) {
        console.log(error);
      } else {
        res.json(Boolean(row.length));
      }
    }
  );
});

app.post("/api/test", (req, res) => {
  const { text, uid } = req.body;
  //Här har vi hårdkodat allt men det så såklart hämtas ur bodyn (och inte heller ligga här....)
  db.run(
    `INSERT INTO messages (userId, text) VALUES (?,?)`,
    [uid, text],
    (error, row) => {
      if (error) {
        console.log(error);
      } else {
        res.json(row);
      }
    }
  );
});

app.use("/api/user", user);
app.use("/api/channel", channel);
app.use("/api/message", message);

//Alltid längst ned
app.listen(PORT, URL, () => {
  console.log(`Running server on ${URL}:${PORT}`);
});
