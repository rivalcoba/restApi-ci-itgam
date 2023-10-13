import homeRouter from './modules/home/home.route';
import { error404, generalError } from './modules/error/error.controller';

export default function addRoutes(app) {
  // HOME
  // GET: /
  app.use('/', homeRouter);

  // 🚨🚨 ERROR SECTION 🚨🚨
  // Catch 404 and forward to error handler
  app.use(error404);

  // General Error Handler
  app.use(generalError);
}
