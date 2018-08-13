import crypto from 'crypto';
import config from 'config';

function encrypt(text) {
  const cipher = crypto.createCipher(config.crypto.algorithm, config.crypto.password);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text) {
  const decipher = crypto.createDecipher(config.crypto.algorithm, config.crypto.password);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

export { encrypt, decrypt };
