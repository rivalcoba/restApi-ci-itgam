import { Router } from 'express';
// Importando validate para validación
import { validate } from 'express-validation';
import userValidation from './user.validation';
import * as userController from './user.controller';

const router = new Router();

// POST /api/v1/users/signup
router.post('/signup', validate(userValidation.signUp, {}, {}), userController.signUp);

export default router;
