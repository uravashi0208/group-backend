var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./config/db-example");
const Group = require("./routes/group.router");
var app = express();
const cors = require("cors");
app.use(bodyParser.json({ limit: "5000mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/node/angular",
  express.static(path.join(__dirname, "/../vkup1-angular10/dist"))
);
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Could not connect to database: " + error);
  });

//User router
app.use("/api", Group);

app.use(
  "/uploads/groupimage",
  express.static(path.join(__dirname, "uploads/groupimage"))
);

app.use(
  "/uploads/category",
  express.static(path.join(__dirname, "uploads/category"))
);

app.get("/node/angular/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/../vkup1-angular10/dist/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
