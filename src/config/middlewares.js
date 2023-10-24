import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

/* TODO: Obtener el modo dejeción de el objeto exportado por 
  constants.js
*/
const devEnviroment = process.env.NODE_ENV === 'development';
const prodEnviroment = process.env.NODE_ENV === 'production';

export default (app) => {
  if (devEnviroment) {
    console.log('📢 EXCECUTION MODE: 🛠 DEVELOPMENT 🛠');
  }
  if (prodEnviroment) {
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

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
    console.log(err);
  });
};
