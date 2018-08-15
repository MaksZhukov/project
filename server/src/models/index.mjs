import mongoose from 'mongoose';
import config from 'config';
import logger from '../common/helpers/winston/index.mjs';

mongoose.connect(`${config.dataBase.url}/${config.dataBase.name}`, { useNewUrlParser: true }, (error) => {
  if (error) {
    logger.error(error);
  } else {
    logger.info(`connected to mongodb on database ${config.dataBase.name}`);
    setTimeout(() => {
      mongoose.connect(`${config.dataBase.url}/${config.dataBase.name}`, { useNewUrlParser: true }, (err) => {
        if (error) {
          logger.error(err);
        } else {
          logger.info(`connected to mongodb on database ${config.dataBase.name}`);
        }
      });
    }, 1000);
  }
});
