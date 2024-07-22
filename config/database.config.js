const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://zeel129patel:Za8ruO6FoIPhEvso@cluster0.ealml2y.mongodb.net/whatsappgroup",
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected successfully");
});
