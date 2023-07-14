import createError from 'http-errors';
import express from 'express';

import middlewares from './config/middlewares';

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// Appliying middlewares
middlewares(app);

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
});

export default app;