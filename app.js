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

app.use("/api/user", user);
app.use("/api/channel", channel);
app.use("/api/message", message);

//The 404 Route (ALWAYS Keep this as the last route)
app.get("*", (req, res) => {
  res.sendStatus(404);
});

//Alltid längst ned
app.listen(PORT, URL, () => {
  console.log(`Running server on ${URL}:${PORT}`);
});
