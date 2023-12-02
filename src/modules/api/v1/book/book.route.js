import { Router } from 'express';
import validate from 'validator';
import * as bookController from './book.controller';
import bookValidators from './book.validators';

const bookRouter = new Router();
// const routes = new Router();
// MetodoGET

// Metodo post que registrar
bookRouter.post(
  '/record',
  validate(bookValidators.record),
  bookController.record,
);

export default bookRouter;
// export default   routes;
