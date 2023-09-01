import createError from 'http-errors';
import express from 'express';
import { ValidationError } from 'express-validation';

import middlewares from './config/middlewares';

import router from './routes';

const app = express();

// Appliying middlewares
middlewares(app);

router.addRoutes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, `404 Pagina no encontrada ${req.method} ${req.originalUrl}`));
});

// error handler
app.use((err, req, res) => {
  // Adding express validate error handler
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
