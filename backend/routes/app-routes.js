module.exports = (app) => {
  app.use("/api/auth", require("./auth-router"));
  app.use("/api/gallery", require("./gallery-router"));
};
