const passport = require('passport');
const config = require('config');


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = { passport, facebookConfig: config.passport.facebook };
