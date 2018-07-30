const jwt = require('jsonwebtoken');
const logger = require('../../common/helpers/winston');
const User = require('../../models/user');
const transporter = require('../../common/helpers/mail');
const { encrypt } = require('../../common/helpers/encryption');
const { urlClient, urlServer, jsonWebTokenSecret } = require('config');

async function searchUser(searchData) {
  let response = '';
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
  let response = '';
  const token = jwt.sign({ mail }, jsonWebTokenSecret, { expiresIn: '1 day' });
  await transporter.sendMail({
    from: 'video games <videogames@gmail.com>', to: mail, subject: options.subject, html: `<b>${options.text}: </b><a href="${options.urlHost}/${options.path}?token=${token}">link</a>`,
  }).then((info) => {
    if (info) {
      logger.info(info);
    }
    response = { client: { status: 'warning', message: options.message }, token };
  }).catch((err) => {
    if (err) {
      logger.error(err);
      response = { client: { status: 'error', message: 'problem with sending mail' } };
    }
  });
  return response;
}

async function createUser(dataFromUser, token) {
  let response = '';
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
      response = { client: { status: 'error', message: 'problem with database' } };
    }
  });
  return response;
}

function verifyToken(token) {
  let response = '';
  jwt.verify(token, jsonWebTokenSecret, (errVerify, decoded) => {
    if (errVerify) {
      logger.error(errVerify);
    }
    const { mail } = decoded;
    response = mail;
  });
  return response;
}

async function updateUser(searchData, set, unset) {
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
        response = { client: { status: 'error', message: 'problem with database' }, error: true };
      } else {
        user.save();
        response = { client: { status: 'success', message: 'pass has been changed' }, error: false };
      }
    });
  return response;
}


module.exports = {
  createUser, updateUser, sendMail, searchUser, verifyToken,
};
