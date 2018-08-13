import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from 'config';
import userService from '../bll/services/user.mjs';
import agenda from '../bll/services/scheduler/index.mjs';
import { encrypt } from '../common/helpers/encryption/index.mjs';
import app from '../app.mjs';

app.post('/api/sign-up/jwt', (req, res) => {
  const dataFromUser = req.body;
  const { mail } = dataFromUser;
  userService.searchUser({ mail }).then((responseSearch) => {
    if (responseSearch.isUser) {
      res.json(responseSearch.client);
    } else {
      userService.sendMail(mail).then((responseMail) => {
        if (responseMail.token) {
          const dataUser = {
            name: dataFromUser.name,
            mail: dataFromUser.mail,
            pass: encrypt(dataFromUser.pass),
            provider: null,
            token: responseMail.token,
            active: false,
          };
          userService.createUser(dataUser).then((responseCreate) => {
            if (!responseCreate) {
              agenda.defineTaskRemoveUser('remove user', { mail: dataFromUser.mail });
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
  userService.searchUser({ token }).then((responseSearch) => {
    if (responseSearch.isUser) {
      userService.updateUser({ token }, { active: true }, { token }).then((responseUpdate) => {
        if (!responseUpdate.error) {
          res.redirect(`${config.urlClient}/sign-in`);
        }
      });
    }
  });
});


app.post('/api/recovery-pass', (req, res) => {
  const { mail } = req.body;
  userService.searchUser({ mail }).then((responseSearch) => {
    if (!responseSearch.isUser) {
      res.json(responseSearch.client);
    } else {
      userService.sendMail(mail, {
        subject: config.client.mailRecovery.subject, text: config.client.mailRecovery.text, message: config.client.mailRecovery.message, urlHost: config.urlClient, path: 'pass-change',
      }).then((responseMail) => {
        if (responseMail.token) {
          const { token } = responseMail;
          userService.updateUser({ mail }, { token }).then((responseUpdate) => {
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
  userService.searchUser({ token }).then((responseSearch) => {
    if (responseSearch.isUser) {
      res.json({ access: true });
    } else {
      res.json({ access: false });
    }
  });
});

app.post('/api/pass-change', (req, res) => {
  const { token, pass } = req.body;
  userService.searchUser({ token }).then((responseSearch) => {
    if (responseSearch.isUser) {
      userService.updateUser(
        { token },
        { pass: encrypt(pass) },
        { token }, config.client.response.changedPass,
      )
        .then((responseUpdate) => {
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
    failureRedirect: `${config.urlClient}/sign-up`,
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
    userService.createUser(dataUser, 'profileId').then((responseCreate) => {
      if (!responseCreate) {
        const redirectUri = `${config.urlClient}/?token=${user.accessToken}`;
        res.redirect(redirectUri);
      }
    });
  });


app.get('/sign-in/facebook', passport.authenticate('facebook'));

app.get('/sign-in/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: `${config.urlClient}/sign-up`,
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
    userService.createUser(dataUser, 'profileId').then((responseCreate) => {
      if (!responseCreate) {
        const redirectUri = `${config.urlClient}/sign-up?token=${user.accessToken}`;
        res.redirect(redirectUri);
      }
    });
  });

app.post('/api/sign-in', (req, res) => {
  const { mail, pass } = req.body;
  userService.searchUser({ mail, pass: encrypt(pass) }).then((responseSearch) => {
    if (responseSearch.isUser) {
      const token = jwt.sign({ mail }, config.jsonWebToken.secret, config.jsonWebToken.expresIn);
      userService.updateUser({ mail }, { token }, null, config.client.response.signIn)
        .then((responseUpdate) => {
          if (responseUpdate.client === config.client.response.signIn) {
            res.json({
              response: responseUpdate.client,
              userInfo: { ...responseSearch.user, token },
            });
          } else {
            res.json(responseUpdate.client);
          }
        });
    } else {
      res.json(responseSearch.client);
    }
  });
});

app.post('/api/check-token', (req, res) => {
  const { token } = req.body;
  userService.searchUser({ token }).then((responseSearch) => {
    if (responseSearch.isUser) {
      res.json({
        response: config.client.response.checkToken,
        userInfo: { ...responseSearch.user, token },
      });
    }
  });
});
