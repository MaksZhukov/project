import jwt from 'jsonwebtoken';
import config from 'config';
import logger from '../../common/helpers/winston/index.mjs';
import User from '../../models/user.mjs';
import transporter from '../../common/helpers/mail/index.mjs';

class UserService {
  async searchUser(searchData) {
    let response = '';
    try {
      const user = await User.findOne(searchData);
      if (user && user.active && !searchData.pass) {
        response = {
          client: config.client.response.registeredUser,
          isUser: true,
          user: { name: user.name, id: user.id },
        };
      }
      if (user && user.active && searchData.pass) {
        response = { isUser: true, user: { name: user.name } };
      }
      if (user && !user.active) {
        response = {
          client: config.client.response.registeredUserNoConfirm,
          isUser: true,
          user: { name: user.name },
        };
      }
      if (!user) {
        response = { client: config.client.response.searchUserNotFound, isUser: false };
      }
    } catch (error) {
      logger.error(error);
      response = { client: config.client.response.errDatabase, isUser: false };
    }
    return response;
  }

  async sendMail(mail, options = {
    subject: config.client.mailRegistration.subject,
    text: config.client.mailRegistration.text,
    message: config.client.mailRegistration.message,
    urlHost: config.urlServer,
    path: 'api/sign-up/jwt/callback',

  }) {
    let response = '';
    const token = jwt.sign({ mail }, config.jsonWebToken.secret, config.jsonWebToken.expresIn);
    try {
      const info = await transporter.sendMail({
        from: config.client.mailRegistration.from, to: mail, subject: options.subject, html: `<b>${options.text}: </b><a href="${options.urlHost}/${options.path}?token=${token}">link</a>`,
      });
      logger.info(info);
      response = { client: { status: 'warning', message: options.message }, token };
    } catch (error) {
      logger.error(error);
      response = { client: config.client.response.errMail };
    }
    return response;
  }

  async createUser(userData) {
    let response = '';
    try {
      await User.create(userData);
    } catch (error) {
      logger.error(error);
      response = { client: config.client.response.errDatabase, error: true };
    }
    return response;
  }

  async updateUser(searchData, set, unset, toClient = config.client.response.changedPass) {
    let response = '';
    const updated = { $set: { ...set, updated: new Date() } };
    if (unset) {
      updated.$unset = unset;
    }
    try {
      const user = await User.findOneAndUpdate(searchData, updated);
      user.save();
      response = { client: toClient, error: false };
    } catch (error) {
      logger.error(error);
      response = { client: config.client.response.errDatabase, error: true };
    }
    return response;
  }
}


export default new UserService();
