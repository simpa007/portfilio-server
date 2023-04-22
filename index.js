const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const database = {
  users: [
    {
      name: "john",
      email: "john@gmail.com",
      message: "can you create a website for me!",
    },
  ],
};

app.get("/contact", (req, res) => {
  res.json(database.users);
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    res.status(404).json("please enter field");
  } else {
    const newUser = {
      name,
      email,
      message,
    };
    database.users.push(newUser);
    res.json(newUser);
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`liistening @ port ${PORT}`);
});
