const express = require("express");
const cors = require("cors");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const mongoose = require("mongoose");
const connectMongoDB = require("connect-mongo");
const uuid = require("uuid/v4");

const app = express();
const notFoundMiddleware = require("./middlewares/not-found");

require('dotenv').config({
  path: `./env-files/${process.env.NODE_ENV || 'development'}.env`
});

const {
  CORS_ORIGIN,
  DB_URL,
  DB_NAME,
  SECRET_KEY,
  SESSION_COOKIE_NAME,
  COOKIE_EXPIRATION_MS,
  NODE_ENV,
} = process.env;

app.use(
  cors({
    credentials: true,
    origin: CORS_ORIGIN,
  })
);

app.use(helmet());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// MARK: Connect mongodb
mongoose.connect(DB_URL.replace("{{dbName}}", DB_NAME), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});
const mongoConnection = mongoose.connection;
mongoConnection.once("open", () => {
  console.log("Connect to database successfully");
});
mongoConnection.on("error", (err) => {
  throw new Error("Database Error: ", err);
});

const MongoStore = connectMongoDB(expressSession);

app.use(
  expressSession({
    genid: (req) => uuid(),
    secret: SECRET_KEY,
    name: SESSION_COOKIE_NAME,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: NODE_ENV === "production",
      expires: Date.now() + parseInt(COOKIE_EXPIRATION_MS, 10),
      maxAge: parseInt(COOKIE_EXPIRATION_MS, 10),
      httpOnly: NODE_ENV === "development",
      domain: CORS_ORIGIN
    },
    store: new MongoStore({
      mongooseConnection: mongoConnection,
    }),
  })
);

require("./routes/app-routes")(app);

app.use(notFoundMiddleware);

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Application is running with port: ${PORT}`);
});

module.exports = server;
