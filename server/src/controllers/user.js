const passport = require('passport');
const { urlClient, urlServer } = require('config');
const {
  createUser, updateUser, sendMail, searchUser, verifyToken, addTokenToUser,
} = require('../bll/services/user');
const app = require('../app');

app.post('/api/sign-up/jwt', (req, res) => {
  const dataFromUser = req.body;
  const { mail } = dataFromUser;
  searchUser({ mail }).then((responseSearch) => {
    if (responseSearch) {
      res.json(responseSearch.client);
    } else {
      sendMail(mail).then((messMail) => {
        if (messMail) {
          createUser(dataFromUser, messMail.token).then((messUserUpdate) => {
            if (!messUserUpdate) {
              res.json(messMail);
            } else {
              res.json(messUserUpdate);
            }
          });
        }
      });
    }
  });
});


app.get('/api/sign-up/jwt/callback', (req, res) => {
  const { token } = req.query;
  const mail = verifyToken(token);
  if (mail) {
    updateUser(mail).then((messUpdate) => {
      if (messUpdate === 'success') {
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
        subject: 'Recovery pass', text: 'Confirm your recovery pass', message: 'check your mail', urlHost: urlClient, path: 'pass-change',
      }).then((messMail) => {
        if (messMail.status !== 'error') {
          addTokenToUser(mail, messMail.token).then((messToken) => {
            if (messToken === 'success') {
              res.json(messMail);
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

app.get('/sign-up/facebook', passport.authenticate('facebook'));

app.get('/sign-up/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: `${urlClient}/sign-up`,
  }),
  (req, res) => {
    const redirectUri = `${urlClient}/sign-up?token=${req.user}`;
    res.redirect(redirectUri);
  });
