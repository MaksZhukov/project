const jwt = require('jsonwebtoken');
const logger = require('../../common/helpers/winston');
const User = require('../../models/user');
const transporter = require('../../common/helpers/mail');
const { encrypt } = require('../../common/helpers/encryption');
const { urlClient, urlServer, jsonWebTokenSecret } = require('config');

async function searchUser(searchData) {
  let response = {};
  await User.findOne(searchData, (err, user) => {
    if (err) {
      logger.error(err);
      response = { client: { status: 'error', message: 'problem with database' }, isUser: false };
    }
    if (user && user.active) {
      response = { client: { status: 'warning', message: 'user has already been registered' }, isUser: true };
    }
    if (user && !user.active) {
      response = { client: { status: 'warning', message: 'check your mail' }, isUser: true };
    }
    return '';
  });
  return response;
}

async function sendMail(mail, options = {
  subject: 'Registration',
  text: 'Confirm you registration by',
  message: 'confirm your mail',
  urlHost: urlServer,
  path: 'api/sign-up/jwt/callback',

}) {
  let message = '';
  const token = jwt.sign({ mail }, jsonWebTokenSecret, { expiresIn: '1 day' });
  await transporter.sendMail({
    from: 'video games <videogames@gmail.com>', to: mail, subject: options.subject, html: `<b>${options.text}: </b><a href="${options.urlHost}/${options.path}?token=${token}">link</a>`,
  }).then((info) => {
    if (info) {
      logger.info(info);
    }
    message = { status: 'warning', message: options.message, token };
  }).catch((err) => {
    if (err) {
      logger.error(err);
      message = { status: 'error', message: 'problem with sending mail' };
    }
  });
  return message;
}

async function createUser(dataFromUser, token) {
  let message = '';
  const userData = {
    name: dataFromUser.name,
    mail: dataFromUser.mail,
    pass: encrypt(dataFromUser.pass),
    provider: null,
    token,
    active: false,
  };
  await User.findOneAndUpdate({ mail: dataFromUser.mail }, userData, {
    upsert: true,
    setDefaultsOnInsert: true,
  }, (err) => {
    if (err) {
      logger.error(err);
      message = { status: 'error', message: 'problem with database' };
    }
  });
  return message;
}

function verifyToken(token) {
  let data = '';
  jwt.verify(token, jsonWebTokenSecret, (errVerify, decoded) => {
    if (errVerify) {
      logger.error(errVerify);
    }
    const { mail } = decoded;
    data = mail;
  });
  return data;
}

async function addTokenToUser(mail, token) {
  let message = '';
  await User.findOneAndUpdate({ mail },
    { $set: { token, updated: new Date() } },
    { upsert: true },
    (errUser) => {
      if (errUser) {
        logger.error(errUser);
      }
      message = 'success';
    });
  return message;
}

async function updateUser(mail) {
  let message = '';
  await User.findOneAndUpdate({ mail },
    { $set: { active: true, updated: new Date() }, $unset: { token: '' } },
    { upsert: true },
    (errUser) => {
      if (errUser) {
        logger.error(errUser);
      }
      message = 'success';
    });
  return message;
}


module.exports = {
  createUser, updateUser, sendMail, searchUser, verifyToken, addTokenToUser,
};
