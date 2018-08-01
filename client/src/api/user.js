const fetchResponseSignUp = dataFromUser => fetch('/api/sign-up/jwt', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(dataFromUser),
}).then(response => response.json()).then(data => data);

const fetchResponseForgotPass = mail => fetch('/api/recovery-pass', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ mail }),
}).then(response => response.json()).then(data => data);
const fetchResponseCheckTokenChangePass = token => fetch('/api/pass-change/token', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ token }),
}).then(response => response.json()).then(data => data);

const fetchResponseChangePass = dataFromUser => fetch('/api/pass-change', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(dataFromUser),
}).then(response => response.json()).then(data => data);

const fetchResponseSignIn = dataFromUser => fetch('/api/sign-in', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(dataFromUser),
}).then(response => response.json()).then(data => data);

const fetchResponseCheckToken = token => fetch('/api/check-token', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ token }),
}).then(response => response.json()).then(data => data);

export default {
  fetchResponseSignUp, fetchResponseForgotPass, fetchResponseCheckTokenChangePass, fetchResponseChangePass, fetchResponseSignIn, fetchResponseCheckToken,
};
