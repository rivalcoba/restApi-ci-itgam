import { Router } from 'express';
import userRouter from '../modules/v1/user/user.route';
import { authJWT } from '../services/auth.services';

const router = new Router();

// /api/v1/users
router.use('/users', userRouter);

// GET /api/v1/hello
router.get('/hello', authJWT, (_, res) => {
  res.send('This is a private route protected by JWT');
});

export default router;
