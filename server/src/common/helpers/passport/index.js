const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../../../models/user');

passport.use(new FacebookStrategy({
  clientID: '288788318526735',
  clientSecret: '3697fac765dfbfe4587ddeda0952053a',
  callbackURL: 'http://localhost:3000/sign-up/facebook/callback',
  profileFields: ['id', 'displayName', 'email'],
  enableProof: true,
},
  ((accessToken, refreshToken, profile, cb) => {
    const userData = {
      profileId: profile.id,
      name: profile.displayName,
      provider: profile.provider,
      token: accessToken,
      active: true,
    };
    User.findOneAndUpdate({ profileId: profile.id }, userData, {
      upsert: true,
      setDefaultsOnInsert: true,
    }, (error) => {
      if (error) {
        // problem with database
      }
    });
    cb(null, accessToken);
  })));


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
