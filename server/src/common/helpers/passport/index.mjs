import passport from 'passport';
import passportFacebook from 'passport-facebook';
import config from 'config';


passport.use(new passportFacebook.Strategy(config.passport.facebook,
  ((accessToken, refreshToken, profile, cb) => {
    cb(null, { ...profile, accessToken });
  })));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
