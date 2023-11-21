// import usersRouter from './routes/users';
import homeRouter from './modules/home/home.route';
import { error404, generalError } from './modules/error/error.controller';
import apiV1Router from './modules/api/v1/api.v1.route';

export default (app) => {
  /*
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  */
  // HOME
  // GET: /
  app.use('/', homeRouter);
  // USER
  // GET Ruta Raiz de usuario
  app.use('/api/v1', apiV1Router);

  // catch 404 and forward to error handler
  app.use(error404);
  // error handler
  app.use(generalError);
};
