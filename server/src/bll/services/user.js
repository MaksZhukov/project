const jwt = require('jsonwebtoken');
const logger = require('../../common/helpers/winston');
const User = require('../../models/user');
const transporter = require('../../common/helpers/mail');
const {
  urlClient, urlServer, jsonWebToken, client,
} = require('config');

async function searchUser(searchData) {
  let response = '';
  await User.findOne(searchData, (err, user) => {
    if (err) {
      logger.error(err);
      response = { client: client.response.errDatabase, isUser: false };
    }
    if (user && user.active && !searchData.pass) {
      response = { client: client.response.registeredUser, isUser: true };
    }
    if (user && user.active && searchData.pass) {
      response = { isFind: true };
    }
    if (user && !user.active) {
      response = { client: client.response.registeredUserNoConfirm, isUser: true };
    }
    if (!user) {
      response = { client: client.response.searchUserNotFound, isUser: false };
    }
    return '';
  });
  return response;
}

async function sendMail(mail, options = {
  subject: client.mailRegistration.subject,
  text: client.mailRegistration.text,
  message: client.mailRegistration.message,
  urlHost: urlServer,
  path: 'api/sign-up/jwt/callback',

}) {
  let response = '';
  const token = jwt.sign({ mail }, jsonWebToken.secret, jsonWebToken.expresIn);
  await transporter.sendMail({
    from: client.mailRegistration.from, to: mail, subject: options.subject, html: `<b>${options.text}: </b><a href="${options.urlHost}/${options.path}?token=${token}">link</a>`,
  }).then((info) => {
    if (info) {
      logger.info(info);
    }
    response = { client: { status: 'warning', message: options.message }, token };
  }).catch((err) => {
    if (err) {
      logger.error(err);
      response = { client: client.response.errMail };
    }
  });
  return response;
}

async function createUser(userData, searchField = 'mail') {
  let response = '';
  await User.findOneAndUpdate({ [searchField]: userData[searchField] }, userData, {
    upsert: true,
    setDefaultsOnInsert: true,
  }, (err) => {
    if (err) {
      logger.error(err);
      response = { client: client.response.errDatabase, error: true };
    }
  });
  return response;
}

async function updateUser(searchData, set, unset, toClient = client.response.changedPass) {
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
        response = { client: client.response.errDatabase, error: true };
      } else {
        user.save();
        response = { client: toClient, error: false };
      }
    });
  return response;
}


module.exports = {
  createUser, updateUser, sendMail, searchUser,
};
