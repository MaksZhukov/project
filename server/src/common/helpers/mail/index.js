const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'malabar7778892@gmail.com',
    pass: 'ytngfhjkz199719971997',
  },
});

module.exports = transporter;
