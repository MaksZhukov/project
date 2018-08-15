import mongoose from 'mongoose';
import config from 'config';
import logger from '../common/helpers/winston/index.mjs';

console.log(`${config.dataBase.url}/${config.dataBase.name}`);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin:maks_zhukov_97@ds213759.mlab.com:13759/react_video_games', { useNewUrlParser: true }, (error) => {
  if (error) {
    logger.error(error);
  } else {
    logger.info(`connected to mongodb on database ${config.dataBase.name}`);
  }
});
