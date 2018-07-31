const passport = require('passport');
const jwt = require('jsonwebtoken');
const {
  urlClient, urlServer, client, jsonWebToken,
} = require('config');
const {
  createUser, updateUser, sendMail, searchUser,
} = require('../bll/services/user');
const { defineTaskRemoveUser } = require('../bll/services/scheduler');
const { encrypt } = require('../common/helpers/encryption');
const app = require('../app');

app.post('/api/sign-up/jwt', (req, res) => {
  const dataFromUser = req.body;
  const { mail } = dataFromUser;
  searchUser({ mail }).then((responseSearch) => {
    if (responseSearch.isUser) {
      res.json(responseSearch.client);
    } else {
      sendMail(mail).then((responseMail) => {
        if (responseMail.token) {
          const dataUser = {
            name: dataFromUser.name,
            mail: dataFromUser.mail,
            pass: encrypt(dataFromUser.pass),
            provider: null,
            token: responseMail.token,
            active: false,
          };
          createUser(dataUser).then((responseCreate) => {
            if (!responseCreate) {
              defineTaskRemoveUser('remove user', { mail: dataFromUser.mail });
              res.json(responseMail.client);
            } else {
              res.json(responseCreate.client);
            }
          });
        }
      });
    }
  });
});


app.get('/api/sign-up/jwt/callback', (req, res) => {
  const { token } = req.query;
  searchUser({ token }).then((responseSearch) => {
    if (responseSearch.isUser) {
      updateUser({ token }, { active: true }, { token }).then((responseUpdate) => {
        if (!responseUpdate.error) {
          res.redirect(`${urlClient}/sign-in`);
        }
      });
    }
  });
});


app.post('/api/recovery-pass', (req, res) => {
  const { mail } = req.body;
  searchUser({ mail }).then((responseSearch) => {
    if (!responseSearch.isUser) {
      res.json(responseSearch.client);
    } else {
      sendMail(mail, {
        subject: client.mailRecovery.subject, text: client.mailRecovery.text, message: client.mailRecovery.message, urlHost: urlClient, path: 'pass-change',
      }).then((responseMail) => {
        if (responseMail.token) {
          const { token } = responseMail;
          updateUser({ mail }, { token }).then((responseUpdate) => {
            if (responseUpdate.error) {
              res.json(responseUpdate.client);
            } else {
              res.json(responseMail.client);
            }
          });
        }
      });
    }
  });
});


app.post('/api/pass-change/token', (req, res) => {
  const { token } = req.body;
  searchUser({ token }).then((responseSearch) => {
    if (responseSearch.isUser) {
      res.json({ access: true });
    } else {
      res.json({ access: false });
    }
  });
});

app.post('/api/pass-change', (req, res) => {
  const { token, pass } = req.body;
  searchUser({ token }).then((responseSearch) => {
    if (responseSearch.isUser) {
      updateUser({ token }, { pass: encrypt(pass) }, { token }, client.response.changedPass).then((responseUpdate) => {
        res.json(responseUpdate.client);
      });
    } else {
      res.json(responseSearch.client);
    }
  });
});


app.get('/sign-up/facebook', passport.authenticate('facebook'));

app.get('/sign-up/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: `${urlClient}/sign-up`,
  }),
  (req, res) => {
    const { user } = req;
    const dataUser = {
      profileId: user.id,
      name: user.displayName,
      provider: user.provider,
      token: user.accessToken,
      active: true,
    };
    createUser(dataUser, 'profileId').then((responseCreate) => {
      if (!responseCreate) {
        const redirectUri = `${urlClient}/?token=${user.accessToken}`;
        res.redirect(redirectUri);
      }
    });
  });


app.get('/sign-in/facebook', passport.authenticate('facebook'));

app.get('/sign-in/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: `${urlClient}/sign-up`,
  }),
  (req, res) => {
    const { user } = req;
    const dataUser = {
      profileId: user.id,
      name: user.displayName,
      provider: user.provider,
      token: user.accessToken,
      active: true,
    };
    createUser(dataUser, 'profileId').then((responseCreate) => {
      if (!responseCreate) {
        const redirectUri = `${urlClient}/sign-up?token=${user.accessToken}`;
        res.redirect(redirectUri);
      }
    });
  });

app.post('/api/sign-in', (req, res) => {
  const { mail, pass } = req.body;
  searchUser({ mail, pass: encrypt(pass) }).then((responseSearch) => {
    if (responseSearch.isFind) {
      const token = jwt.sign({ mail }, jsonWebToken.secret, jsonWebToken.expresIn);
      updateUser({ mail }, { token }, null, client.response.signIn).then((responseUpdate) => {
        if (responseUpdate.client === client.response.signIn) {
          res.json({ ...responseUpdate.client, token });
        } else {
          res.json(responseUpdate.client);
        }
      });
    } else {
      res.json(responseSearch.client);
    }
  });
});
