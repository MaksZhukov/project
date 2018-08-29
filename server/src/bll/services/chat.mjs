import config from 'config';
import Chat from '../../models/userChat.mjs';
import logger from '../../common/helpers/winston/index.mjs';


class ChatService {
  async getAllMessages() {
    let response = {};
    try {
      const messages = (await Chat.find().populate('userId', 'name')).map(({ userId, message, created }) => ({ name: userId.name, message, date: created }));
      response = { messages, ...config.client.response.getAllMessages };
    } catch (error) {
      logger.error(error);
    }
    return response;
  }

  async sendMessage({ message, userId }) {
    let response = {};
    try {
      await Chat.create({ message, userId });
      response = { ...config.client.response.sendMessage };
    } catch (error) {
      logger.error(error);
    }
    return response;
  }
}

export default new ChatService();
