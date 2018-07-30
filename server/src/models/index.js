const mongoose = require('mongoose');
const { dataBase } = require('config');
const logger = require('../common/helpers/winston');


mongoose.connect(`mongodb://localhost:27017/${dataBase.name}`, { useNewUrlParser: true }, (error) => {
  if (error) {
    logger.error(error);
  }
  logger.info(`connected to mongodb on database ${dataBase.name}`);
});
