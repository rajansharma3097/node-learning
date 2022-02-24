const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const feedRoutes = require("./routes/feed");

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
});

mongoose
  .connect(
    "mongodb+srv://rajan:rajan%40123@cluster0.rns3t.mongodb.net/messages?w=majority"
  )
  .then((result) => {
    app.listen(8000);
  })
  .catch((err) => console.log(err));
