const { sign } = require("jsonwebtoken");

const generateToken = (username, tokenSecret) => sign({ username }, tokenSecret);

module.exports = { generateToken };
