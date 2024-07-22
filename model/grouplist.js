const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let GroupList = new Schema(
  {
    group_name: {
      type: String,
    },
    category_id: {
      type: Schema.Types.ObjectId,
    },
    group_link: {
      type: String,
    },
    group_image: {
      type: String,
    },
    group_description: {
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
    collection: "grouplist",
  }
);

module.exports = mongoose.model("GroupList", GroupList);
