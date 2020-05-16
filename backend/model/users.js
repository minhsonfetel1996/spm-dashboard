const mongoose = require("mongoose");
const audit = require("./common/audit");

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 8,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  role: { type: String, enum: ["ADMIN", "USERS"] },
  firstName: { type: String, maxLength: 100 },
  lastName: { type: String, maxLength: 100 },
  isActive: { type: Boolean, default: false },
  lastLogin: { type: Date },
  ...audit,
});

UsersSchema.pre(["updateOne", "findOneAndUpdate"], (next) => {
  this.updatedTs = Date.now();
  next();
});

module.exports = mongoose.model("Users", UsersSchema);
