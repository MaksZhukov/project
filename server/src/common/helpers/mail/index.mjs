import nodemailer from 'nodemailer';
import config from 'config';

const transporter = nodemailer.createTransport(config.mail);

export default transporter;
