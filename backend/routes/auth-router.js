const express = require("express");

const authRouter = express.Router();
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const UsersSchema = require("../model/users");
const { generateToken } = require("../service/jwt-service");
const verifyToken = require("../middlewares/auth");
const usersValidators = require("./validation/users-validators");
const {
  getCurrentUserFromToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../service/auth-service");

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  SALT,
} = process.env;

const processAuthentication = (user, res, message) => {
  const accessToken = generateToken(user.username, ACCESS_TOKEN_SECRET);
  sendAccessToken(res, accessToken);
  const refreshToken = generateToken(user.username, REFRESH_TOKEN_SECRET);
  sendRefreshToken(res, refreshToken);
  res.status(200).json({
    user: {
      id: user._id,
      displayName: `${user.firstName} ${user.lastName}`,
    },
    message,
  });
};

const validateAccount = (req, res) => {
  const errors = validationResult(req);
  if (errors && errors.array().length > 0) {
    return res.status(400).json({ error: errors.array() });
  }
};

const login = async (req, res) => {
  try {
    if (getCurrentUserFromToken(req, res)) {
      throw new Error("You must log out before login");
    }
    validateAccount(req, res);

    const { username, password } = req.body;
    let user = await UsersSchema.findOne({ username });
    if (!user) {
      throw new Error("Invalid username.");
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      throw new Error("Invalid password.");
    } else {
      const userModel = {
        isActive: true,
        lastLogin: new Date(),
      };
      // Update last login and make sure the exist user
      user = await UsersSchema.update({ _id: user._id }, userModel).findOne();
      if (!user) {
        throw new Error("Invalid username or password.");
      }
      processAuthentication(user, res, "Login succesfully.");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    let user = getCurrentUserFromToken(req);
    if (!user) {
      throw new Error("You must login before log out.");
    } else {
      const userModel = {
        isActive: false,
      };
      user = await UsersSchema.update({ _id: user._id }, userModel).findOne();
      res.clearCookie(COOKIE_ACCESS_TOKEN, { path: "/" });
      res.clearCookie(COOKIE_REFRESH_TOKEN, { path: "/" });
      res.status(200).json({ message: "Log out successfully." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getApplicationContext = async (req, res) => {
  let user = getCurrentUserFromToken(req, res);
  if (user) {
    user = await UsersSchema.findOne({ username: user.username });
    if (!user) {
      res.status(400).json({ message: "Cannot found user. Try again?" });
    } else {
      processAuthentication(user, res);
    }
  } else {
    res.status(200).json({ message: "You have not logged in" });
  }
};

const register = async (req, res) => {
  try {
    if (getCurrentUserFromToken(req, res)) {
      throw new Error("You must log out before login");
    }
    const { username, password, firstName, lastName } = req.body;
    let user = await UsersSchema.findOne({ username: username });
    if (user) {
      return res
        .status(400)
        .json({ message: "The username is available. Try again?" });
    }
    validateAccount(req, res);

    const userModel = {
      username,
      password,
      firstName,
      lastName,
      isActive: true,
      lastLogin: new Date(),
    };
    userModel.password = bcrypt.hashSync(userModel.password, parseInt(SALT));
    const userSchema = new UsersSchema({ ...userModel });
    const result = await userSchema.save();
    processAuthentication(result, res, "Register succesfully.");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

authRouter.post("/keep-alive", getApplicationContext);
authRouter.post("/login", usersValidators(), login);
authRouter.post("/logout", verifyToken, logout);
authRouter.post("/register", usersValidators(), register);

module.exports = authRouter;
