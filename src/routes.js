import indexRouter from './routes/index';
import usersRouter from './routes/users';

export default (app) => {
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
};
