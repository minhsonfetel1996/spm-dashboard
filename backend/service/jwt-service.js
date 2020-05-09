const { sign } = require("jsonwebtoken");

const generateToken = (user, tokenSecret) =>
  sign({ _id: user.id }, tokenSecret);

module.exports = { generateToken };
