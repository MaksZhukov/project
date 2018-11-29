import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import socketIo from 'socket.io';
import fileUpload from 'express-fileupload';
import config from 'config';
import agenda from './bll/services/scheduler/index.mjs';
import chatService from './bll/services/chat.mjs';
import passport from './common/helpers/passport/index.mjs';

import logger from './common/helpers/winston/index.mjs';

const app = express();

app.use(bodyParser.json());
app.use(fileUpload());
app.use(passport.initialize());
app.use(passport.session());


const server = app.listen(config.portServer, () => {
  logger.info(`Listening on port ${config.portServer}`);
  console.log(`Listening on port ${config.portServer}`);
});

agenda.start();

const io = socketIo(server);

io.on('connect', (socket) => {
  socket.on('SEND_MESSAGE', (data) => {
    chatService.sendMessage(data).then((response) => {
      io.emit('SEND_MESSAGE', response);
    });
  });
  socket.on('GET_ALL_MESSAGES', () => {
    chatService.getAllMessages().then((response) => {
      io.emit('GET_ALL_MESSAGES', response);
    });
  });
});


export { app, server };
