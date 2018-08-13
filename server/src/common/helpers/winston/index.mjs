import winston from 'winston';

const { combine, timestamp } = winston.format;


const logger = winston.createLogger({
  format: combine(
    timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
