const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 4,
    max: 40,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    min: 4,
    max: 11,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: { type: String, required: true, trim: true },
  status: { type: Boolean },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
