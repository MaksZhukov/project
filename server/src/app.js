const express = require('express');
const bodyParser = require('body-parser');
const { portServer } = require('config');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('./models/user');
const { passport, facebookConfig } = require('./common/helpers/passport');

const logger = require('./common/helpers/winston');

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


passport.use(new FacebookStrategy(facebookConfig,
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
        logger.error(error);
      }
    });
    cb(null, accessToken);
  })));

app.listen(portServer, () => {
  logger.info(`Listening on port ${portServer}`);
  console.log(`Listening on port ${portServer}`);
});

module.exports = app;
