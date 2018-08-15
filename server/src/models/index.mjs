import mongoose from 'mongoose';
import config from 'config';
import logger from '../common/helpers/winston/index.mjs';


const options = {
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useNewUrlParser: true,
};

const connectWithRetry = () => {
  mongoose.connect(`${config.dataBase.url}/${config.dataBase.name}`, options)
    .then(() => {
      logger.info(`connected to mongodb on database ${config.dataBase.name}`);
    })
    .catch((error) => {
      logger.error(error);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();
