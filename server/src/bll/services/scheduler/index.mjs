import Agenda from 'agenda';
import config from 'config';
import moment from 'moment';
import logger from '../../../common/helpers/winston/index.mjs';
import User from '../../../models/user.mjs';
import Chat from '../../../models/userChat.mjs';

const agenda = new Agenda({ db: { address: `localhost:27017/${config.dataBase.name}` } });


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
function defineTaskRemoveMessages() {
  agenda.define('remove messages', async () => {
    const response = await Chat.remove({ created: { $lt: moment(new Date()).add('-1', 'd') } });
    if (response.n > 0) {
      logger.info('messages was deleted');
    }
  });

  agenda.every('1 days', 'remove messages');
}

function start() {
  agenda.on('ready', () => {
    agenda.start();
    logger.info('agenda launched');
    defineTaskRemoveMessages();
  });
}

export default { start, defineTaskRemoveUser };
