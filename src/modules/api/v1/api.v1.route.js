import { Router } from 'express';
// importando el enrutador user
import userRouter from './user/user.route';

const apiV1router = new Router();

// Declaramos /users para la ruta base del usuario
apiV1router.use('/users', userRouter);
export default apiV1router;
