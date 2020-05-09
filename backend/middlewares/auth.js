const { verifyTokenByNameAndSecretKey } = require("../service/auth-service");
const { COOKIE_ACCESS_TOKEN, ACCESS_TOKEN_SECRET } = process.env;

module.exports = (req, res, next) => {
  verifyTokenByNameAndSecretKey(
    req,
    res,
    next,
    COOKIE_ACCESS_TOKEN,
    ACCESS_TOKEN_SECRET
  );
};
