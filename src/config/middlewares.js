import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import Debug from 'debug';

// Production Depenencies
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';

import constants from './constants';

export default (app) => {
  // Middlewares are applied depending on the context
  // Defatul Middlewares
  // view engine setup
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'hbs');
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '..', '..', 'public')));
  // Development Middlewares
  if (constants.ENV === 'development') {
    const debug = Debug('restapi-ci-itgam');
    app.use(logger('dev'));
    debug('📢 EXCECUTION MODE DEVELOPMENT');
  }
  // production Middlewares
  if (constants.ENV === 'production') {
    app.use(compression());
    app.use(helmet());
  }

  return app;
};
