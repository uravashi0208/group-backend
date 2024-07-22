const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PrivacyPolicy = new Schema(
  {
    privacy_policy_data: {
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
    collection: "privacypolicy",
  }
);

module.exports = mongoose.model("PrivacyPolicy", PrivacyPolicy);
