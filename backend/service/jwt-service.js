const { sign } = require("jsonwebtoken");

const generateAuthToken = (user, tokenSecret) =>
  sign(
    {
      _id: user.id,
    },
    tokenSecret
  );

module.exports = { generateAuthToken };
