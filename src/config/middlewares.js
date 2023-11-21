import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import mongoose from 'mongoose';
import log from './winston';
import constants from './constants';

/* Obteniendo modo de ejecución de el objeto exportado por 
  constants.js
*/
const modeEnviroment = constants.ENV;

export default (app) => {
  if (modeEnviroment === 'development') {
    console.log('📢 EXCECUTION MODE: 🛠 DEVELOPMENT 🛠');
  }
  if (modeEnviroment === 'production') {
    app.use(compression());
    app.use(helmet());
    console.log('📢 EXCECUTION MODE: 🏭 PRODUCTION 🏭');
  }
  // view engine setup
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'hbs');
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static('public'));

  // Conexión con la base de datos
  app.use((req, res, next) => {
    if (mongoose.connection.readyState === 1) {
      log.info('✔ Conexión a la base establecida ✨');
      next();
    } else {
      res.status(503).json({ message: 'Service unavailable' });
    }
  });
};
