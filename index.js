const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect = (process.env.MONGOLAB_URI,
{
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

// mongoose.connect("mongodb://127.0.0.1:27017/portfilioDB");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
app.get("/contact", (req, res) => {
  User.find({})
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err, "omething went wrong");
    });
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(404).json("please enter field");
  } else if (!validateEmail(email)) {
    res.json("Wrong email format");
  } else {
    const data = await User.create([{ name, email, message }]);
    res.json(data);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`liistening @ port ${PORT}`);
});
