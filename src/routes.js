// import usersRouter from './routes/users';
import homeRouter from './modules/home/home.route';
import { error404, generalError } from './modules/error/error.controller';

export default (app) => {
  /*
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  */
  // HOME
  // GET: /
  app.use('/', homeRouter);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(error404);
  });

  // error handler
  app.use(generalError);
};
