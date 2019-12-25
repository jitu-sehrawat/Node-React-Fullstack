const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const { User } = require('../models/user');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: keys.googleCallbackURL
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // We already have record with given profile googleId
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id }).save().then((user) => {
            done(null, user);
          });
        }
      });
    }
  )
);
