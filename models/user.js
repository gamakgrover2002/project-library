const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    timestamp: { type: String, default: Date.now() },
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
