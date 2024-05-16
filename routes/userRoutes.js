const express = require("express");
const user = express.Router();
const { createUser } = require("../functions/userFunctions");

//BaseURL '/api/user'
user.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (username == "" || password == "") {
    res.status(400).send({
      message: "username or password cannot be empty",
    });
    return;
  }

  try {
    await createUser(username, password);
    res.status(200).send({ message: "user successfully created" });
  } catch (error) {
    res.sendStatus(500);
  }
});

user.post("/login", (req, res) => {
  res.json({ msg: "logged in " });
});

module.exports = user;
