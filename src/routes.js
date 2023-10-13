import createError from 'http-errors';

import homeRouter from './modules/home/home.route';

export default function addRoutes(app) {
  // HOME
  // GET: /
  app.use('/', homeRouter);

  // 🚨🚨 ERROR SECTION 🚨🚨
  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // General Error Handler
  // eslint-disable-next-line
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}
