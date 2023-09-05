import { Router } from 'express';
// Importando validate para validación
import { validate } from 'express-validation';
import userValidation from './user.validation';
import * as userController from './user.controller';

// Importing auth strategy
import { authLocal } from '../../../services/auth.services';

const router = new Router();

// POST /api/v1/users/signup
router.post('/signup', validate(userValidation.signUp, {}, {}), userController.signUp);

// POST /api/v1/users/login
router.post('/login', authLocal, userController.login);

export default router;
