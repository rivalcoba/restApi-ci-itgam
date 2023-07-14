import homeRouter from '../modules/home/home.route';
import userRouter from '../modules/user/user.route';

const addRoutes = (app) => {
  // HOME
  app.use('/', homeRouter);

  // USER
  app.use('/api/v1/users', userRouter);
};

export default { addRoutes };
