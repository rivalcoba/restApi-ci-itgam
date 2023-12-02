import { Router } from 'express';
// Importamos el controlador del suario
import * as userController from './user/user.controller';
import * as bookController from './book/book.controller';

const router = new Router();
// Declaramos /users/test para la ruta base del usuario
router.get('/users/test', userController.test);
// Registra los datos
router.post('/book/record', bookController.record);
// Busca por id
router.get('/book/getOneBook', bookController.getOneBook);
// // Manda a llamar todos los datos que contiene el libro
router.get('/book/getallBook', bookController.getallBook);
// Actualizando libro por id
router.patch('/book/updateOneBook', bookController.updateOneBook);

export default router;
