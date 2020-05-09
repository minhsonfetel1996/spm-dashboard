const { verify } = require("jsonwebtoken");
const {
  COOKIE_ACCESS_TOKEN_EXPIRATION_MS,
  COOKIE_REFRESH_TOKEN_EXPIRATION_MS,
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  NODE_ENV,
  ACCESS_TOKEN_SECRET,
} = process.env;

const verifyTokenByNameAndSecretKey = (
  req,
  res,
  next,
  cookieTokenName,
  secret
) => {
  const token = req.cookies[cookieTokenName];
  if (!token) {
    return res
      .status(401)
      .json({ status: 401, message: "Access Denied. No token provided" });
  } else {
    const decoded = verify(token, secret);
    if (decoded) {
      next();
    } else {
      res.status(500).json({ message: ex.message });
    }
  }
};

const sendRefreshToken = (res, token) => {
  res.cookie(COOKIE_REFRESH_TOKEN, token, {
    httpOnly: NODE_ENV === "development",
    secure: NODE_ENV === "production",
    expires: new Date(
      Date.now() + parseInt(COOKIE_REFRESH_TOKEN_EXPIRATION_MS, 10)
    ),
    maxAge: parseInt(COOKIE_REFRESH_TOKEN_EXPIRATION_MS, 10),
    sameSite: NODE_ENV === "production" ? "none" : undefined,
  });
};

const sendAccessToken = (res, token) => {
  res.cookie(COOKIE_ACCESS_TOKEN, token, {
    httpOnly: NODE_ENV === "development",
    secure: NODE_ENV === "production",
    expires: new Date(
      Date.now() + parseInt(COOKIE_ACCESS_TOKEN_EXPIRATION_MS, 10)
    ),
    maxAge: parseInt(COOKIE_ACCESS_TOKEN_EXPIRATION_MS, 10),
    sameSite: NODE_ENV === "production" ? "none" : undefined,
  });
};

const getCurrentUserFromToken = (req) => {
  const token = req.cookies[COOKIE_ACCESS_TOKEN];
  if (!token) {
    return null;
  }
  return verify(token, ACCESS_TOKEN_SECRET);
};

module.exports = {
  verifyTokenByNameAndSecretKey,
  sendRefreshToken,
  sendAccessToken,
  getCurrentUserFromToken,
};
