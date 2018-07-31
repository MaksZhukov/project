const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('config');


passport.use(new FacebookStrategy(config.passport.facebook,
  ((accessToken, refreshToken, profile, cb) => {
    cb(null, { ...profile, accessToken });
  })));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
