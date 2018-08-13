import Agenda from 'agenda';
import config from 'config';
import logger from '../../../common/helpers/winston/index.mjs';
import User from '../../../models/user.mjs';

const agenda = new Agenda({ db: { address: `localhost:27017/${config.dataBase.name}` } });

function start() {
  agenda.on('ready', () => {
    agenda.start();
    logger.info('agenda launched');
  });
}

function defineTaskRemoveUser(name, dataSearch, inTime = 'in one day') {
  agenda.define(name, () => {
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

export default { start, defineTaskRemoveUser };
