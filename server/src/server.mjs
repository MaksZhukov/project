import path from 'path';
import express from 'express';
import config from 'config';
import {app} from './app.mjs'
import './models/index.mjs';
import './controllers/index.mjs';

if (config.util.getEnv('NODE_ENV') === 'production') {
  app.use(express.static('../client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('../client/dist/index.html'));
  });
}
