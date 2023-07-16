import { Router } from 'express';
import userRouter from '../modules/v1/user/user.route';

const router = new Router();

// /api/v1/users
router.use('/users', userRouter);

export default router;
