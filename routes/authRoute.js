const passport = require('passport');
const keys = require('../config/keys');

module.exports = (app) => {
  // Starting Oauth
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: [ 'profile', 'email' ]
    })
  );

  // callBackURL and Getting user info
  app.get(keys.googleCallbackURL, passport.authenticate('google'));
};
