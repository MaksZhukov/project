const nodemailer = require('nodemailer');
const { mail } = require('config');

const transporter = nodemailer.createTransport(mail);

module.exports = transporter;
