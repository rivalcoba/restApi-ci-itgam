// Importando router
import { Router } from 'express';

// importando el controlador home
import homeController from './home.controller';

// Creando la instancia de un roter
const router = Router();
// Get
router.get('/', homeController.homeView);
//

export default router;
