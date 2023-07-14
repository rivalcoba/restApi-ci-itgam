import { Router } from 'express';

import * as userController from './user.controller';

const router = new Router();

// POST /api/v1/users/signup
router.post('/signup', userController.signUp);

export default router;
