const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Category = new Schema(
  {
    category_name: {
      type: String,
    },
    category_description: {
      type: String,
    },
    category_image: {
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
    collection: "category",
  }
);

module.exports = mongoose.model("Category", Category);
