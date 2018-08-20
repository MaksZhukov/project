import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import config from 'config';
import agenda from './bll/services/scheduler/index.mjs';
import passport from './common/helpers/passport/index.mjs';

import logger from './common/helpers/winston/index.mjs';

const app = express();

app.use(bodyParser.json());
app.use(fileUpload());
app.use(passport.initialize());
app.use(passport.session());


app.listen(config.portServer, () => {
  logger.info(`Listening on port ${config.portServer}`);
  console.log(`Listening on port ${config.portServer}`);
});

agenda.start();

export default app;
