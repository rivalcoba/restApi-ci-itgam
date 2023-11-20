import { Router } from 'express';
// Importamos el controlador del suario
import * as userController from './user/user.controller';

const router = new Router();
// Declaramos /users/test para la ruta base del usuario
router.get('/users/test', userController.test);

export default router;
