const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");

const app = express();
const User = require("./models/user");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use((req, res, next) => {
  User.findById("6200ba1c99ff9de47be90bb3")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
  // next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://rajan:rajan%40123@cluster0.rns3t.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "RJay",
          email: "rjay@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => console.log(err));
