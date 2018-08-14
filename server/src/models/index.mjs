import mongoose from 'mongoose';
import config from 'config';
import logger from '../common/helpers/winston/index.mjs';

console.log(config);

mongoose.connect(`${config.dataBase.url}/${config.dataBase.name}`, { useNewUrlParser: true }, (error) => {
  if (error) {
    logger.error(error);
  } else {
    logger.info(`connected to mongodb on database ${config.dataBase.name}`);
  }
});
