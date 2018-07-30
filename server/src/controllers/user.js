const passport = require('passport');
const { urlClient, urlServer, client } = require('config');
const {
  createUser, updateUser, sendMail, searchUser, verifyToken, addTokenToUser,
} = require('../bll/services/user');
const { encrypt } = require('../common/helpers/encryption');
const app = require('../app');

app.post('/api/sign-up/jwt', (req, res) => {
  const dataFromUser = req.body;
  const { mail } = dataFromUser;
  searchUser({ mail }).then((responseSearch) => {
    if (responseSearch) {
      res.json(responseSearch.client);
    } else {
      sendMail(mail).then((responseMail) => {
        if (responseMail.token) {
          createUser(dataFromUser, responseMail.token).then((responseCreate) => {
            if (!responseCreate) {
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
  const responseVerify = verifyToken(token);
  if (responseVerify.mail) {
    const mail = responseVerify;
    updateUser({ mail }, { active: true }, { token }).then((responseUpdate) => {
      if (!responseUpdate.error) {
        res.redirect(`${urlClient}/sign-in`);
      }
    });
  }
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
  const responseVerify = verifyToken(token);
  if (responseVerify.mail) {
    res.json({ access: true });
  } else {
    res.json({ access: false });
  }
});

app.post('/api/pass-change', (req, res) => {
  const { token, pass } = req.body;
  searchUser({ token }).then((responseSearch) => {
    if (responseSearch.isUser) {
      updateUser({ token }, { pass: encrypt(pass) }, { token }).then((responseUpdate) => {
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
    const redirectUri = `${urlClient}/sign-up?token=${req.user}`;
    res.redirect(redirectUri);
  });
