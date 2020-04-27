const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: String,
    created: Number,
    username: String,
    name: String,
    speciality: String,
    experience: String,
    values: String,
    message: String,
    rate: String,
    location: String,
    verified: Boolean
  },
  { _id: false }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
