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
const carcollection = "cars";

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
        .insertOne({
          name: req.body.username,
          email: req.body.email,
          message: req.body.message,
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

    app.get("/cars", (req, res) => {
      db.collection(carcollection)
        .find({})
        .limit(10)
        .toArray()
        .then((data) => {
          res.status(200).json(data);

          console.log(data);
        })
        .catch((e) => {
          console.log(e.message);
          res.status(500).json({ error: true, message: "Data Error" });
        });
    });
  })

  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json("Backend Working");
});

app.listen(3000);
