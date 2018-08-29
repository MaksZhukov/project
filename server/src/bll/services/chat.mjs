import config from 'config';
import Chat from '../../models/userChat.mjs';
import logger from '../../common/helpers/winston/index.mjs';


class ChatService {
  async getAllMessages() {
    let response = {};
    try {
      const messages = (await Chat.find().populate('userId', 'name')).map(({
        userId, message, created,
      }) => ({
        id: userId.id, name: userId.name, message, date: created,
      }));
      response = { messages, ...config.client.response.getAllMessages };
    } catch (error) {
      logger.error(error);
    }
    return response;
  }

  async sendMessage({ message, userId, date }) {
    let response = {};
    try {
      const responseMessage = await Chat.populate(await Chat.create({ message, userId, created: date }), { path: 'userId', select: 'name' });
      response = {
        message, id: userId, date, name: responseMessage.userId.name,
      };
    } catch (error) {
      logger.error(error);
    }
    return response;
  }
}

export default new ChatService();
