const express = require('express');
const bodyParser = require('body-parser');
const { portServer } = require('config');
const agenda = require('./bll/services/scheduler');
const passport = require('./common/helpers/passport');

const logger = require('./common/helpers/winston');

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


app.listen(portServer, () => {
  logger.info(`Listening on port ${portServer}`);
  console.log(`Listening on port ${portServer}`);
});

agenda.start();

module.exports = app;
