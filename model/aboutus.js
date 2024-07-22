const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let AboutUs = new Schema(
  {
    about_us_data: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    upadatedAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    collection: "aboutus",
  }
);

module.exports = mongoose.model("AboutUs", AboutUs);
