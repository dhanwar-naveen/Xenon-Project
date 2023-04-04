const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const url =
  "mongodb+srv://naveen:naveen@cluster0.fdfqurm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbname = "xenon";
const usercollection = "users";
const userContact = "contDetails";

client
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    const db = client.db(dbname); //connect to db

    //apis
    app.post("/login", (req, res) => {
      db.collection(usercollection)
        .find({
          username: req.body.username,
          password: req.body.password,
        })
        .toArray()
        .then((data) => {
          if (data.length != 0) {
            res.status(200).json("Success");
          } else {
            res.status(401).json("Login Failed");
          }
          console.log(data);
        })
        .catch((e) => {
          console.log(e.message);
          res.status(500).json({ error: true, message: "Login Error" });
        });
    });

    app.post("/contact", (req, res) => {
      console.log(req.body);
      db.collection(userContact)
        .insert({
          name: req.body.userName,
          email: req.body.userEmail,
          message: req.body.userMessage,
        })

        .then((data) => {
          if (data.length != 0) {
            res.status(200).json("Success");
          } else {
            res.status(401).json("Fetch Error");
          }
          console.log(data);
        })
        .catch((e) => {
          console.log(e.message);
          res
            .status(500)
            .json({ error: true, message: "Not Sent in the Database" });
        });
    });
  })

  .catch((err) => console.log(err));

app.listen(3000);
