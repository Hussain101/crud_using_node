// all the imports
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const app = express();
const port = process.env.PORT || 3000;

// for the mongoose connection with databse
const db = mongoose.connection;
mongoose.connect(process.env.DB_URL);
db.on("error", (error) => console.log("error is", error));
db.once("open", () => console.log("Connected to the server"));

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use(express.static("uploads"));
//set the template engine
app.set("view engine", "ejs");

// all the routes
app.use("", require("./routes/routes"));

app.listen(port, () => {
  console.log(`app is running at localhost://${port}`);
});
