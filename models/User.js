const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    minlength: 3,
    maxlength: 100,
    unique: true,
  },
  displayusername: {
    type: String,
    minlength: 3,
    maxlength: 500,
    required: [true, "Please provide display username"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
    maxlength: 50,
  },
  userid: {
    type: String,
    maxlength: 100,
    default: uuidv4(),
    unique: true,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

module.exports = mongoose.model("User", UserSchema);
