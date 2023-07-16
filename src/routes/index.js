import homeRouter from '../modules/home/home.route';
import apiV1Router from './v1';

const addRoutes = (app) => {
  // HOME
  app.use('/', homeRouter);

  // USER
  app.use('/api/v1', apiV1Router);
};

export default { addRoutes };
