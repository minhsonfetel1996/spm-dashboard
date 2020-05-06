
module.exports = (app) => {
  app.use('/api/auth', require('./auth/auth-router'));
  app.use('/api/gallery', require('./gallery/gallery-router'));
};
