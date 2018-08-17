import jwt from 'jsonwebtoken';
import config from 'config';
import logger from '../../common/helpers/winston/index.mjs';
import User from '../../models/user.mjs';
import transporter from '../../common/helpers/mail/index.mjs';

class UserService {
  async searchUser(searchData) {
    let response = '';
    await User.findOne(searchData, (err, user) => {
      if (err) {
        logger.error(err);
        response = { client: config.client.response.errDatabase, isUser: false };
      }
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
      return '';
    });
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
    await transporter.sendMail({
      from: config.client.mailRegistration.from, to: mail, subject: options.subject, html: `<b>${options.text}: </b><a href="${options.urlHost}/${options.path}?token=${token}">link</a>`,
    }).then((info) => {
      if (info) {
        logger.info(info);
      }
      response = { client: { status: 'warning', message: options.message }, token };
    }).catch((err) => {
      if (err) {
        logger.error(err);
        response = { client: config.client.response.errMail };
      }
    });
    return response;
  }

  async createUser(userData) {
    let response = '';
    await User.create(userData, (err) => {
      if (err) {
        logger.error(err);
        response = { client: config.client.response.errDatabase, error: true };
      }
    });
    return response;
  }

  async updateUser(searchData, set, unset, toClient = config.client.response.changedPass) {
    let response = '';
    const updated = { $set: { ...set, updated: new Date() } };
    if (unset) {
      updated.$unset = unset;
    }
    await User.findOneAndUpdate(searchData,
      updated,
      { },
      (errUser, user) => {
        if (errUser) {
          logger.error(errUser);
          response = { client: config.client.response.errDatabase, error: true };
        }
        if (user) {
          user.save();
          response = { client: toClient, error: false };
        }
      });
    return response;
  }
}


export default new UserService();
