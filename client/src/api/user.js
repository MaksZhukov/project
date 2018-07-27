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
const fetchResponsePassChangeToken = token => fetch('/api/pass-change/token', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ token }),
}).then(response => response.json()).then(data => data);
export default { fetchResponseSignUp, fetchResponseForgotPass, fetchResponsePassChangeToken };
