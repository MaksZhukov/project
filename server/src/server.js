const express = require('express');
//require('./models/user');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const app = express();
const port = 3000;

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: '288788318526735',
    clientSecret: '3697fac765dfbfe4587ddeda0952053a',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
  },
  ((accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    cb(null, profile);
  })));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:3001/sign-up',
  }),
  function (req, res) {
    res.set({
      'Authorization': 'req.user'
    });
    res.redirect('http://localhost:3001/sign-up');
  });

app.listen(port, () => console.log(`Listening on port ${port}`));