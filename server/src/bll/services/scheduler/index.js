const Agenda = require('agenda');
const { dataBase } = require('config');
const logger = require('../../../common/helpers/winston');
const User = require('../../../models/user');

const agenda = new Agenda({ db: { address: `localhost:27017/${dataBase.name}` } });

function start() {
  agenda.on('ready', () => {
    agenda.start();
    logger.info('agenda launched');
  });
}

function defineTaskRemoveUser(name, dataSearch, inTime = 'in one day') {
  agenda.define(name, (job, done) => {
    User.findOneAndRemove(dataSearch, (err, user) => {
      if (err) {
        logger.error(err);
      }
      if (user && !user.active) {
        user.save();
        logger.info(`${name} ${user.mail}`);
      }
    });
  });

  agenda.schedule(inTime, name);
}

module.exports = { start, defineTaskRemoveUser };
