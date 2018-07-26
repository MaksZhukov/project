const mongoose = require('mongoose');
const { dbName } = require('config');
const logger = require('../common/helpers/winston');


mongoose.connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true }, (error) => {
  if (error) {
    logger.error(error);
  }
  logger.info(`connected to mongodb on database ${dbName}`);
});
