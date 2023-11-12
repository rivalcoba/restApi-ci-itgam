import { Router } from 'express';
import * as userController from './user.controller';

const userRouter = new Router();

// GET /api/v1/users
userRouter.get('/', userController.getUser);

// GET /api/v1/users/test
userRouter.get('/test', userController.test);

export default userRouter;
