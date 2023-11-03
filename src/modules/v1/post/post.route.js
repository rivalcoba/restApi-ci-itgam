import { Router } from 'express';
import { validate } from 'express-validation';
import * as postController from './post.controller';
import { authJWT } from '../../../services/auth.services';
import postValidations from './post.validations';
// Importando validate para validación

const postRouter = new Router();

// GET /api/v1/posts/<id>
postRouter.get('/:id', postController.getPostById);

// POST /api/v1/posts
postRouter.post(
  '/',
  authJWT,
  validate(postValidations.createPost),
  postController.createPost,
);

export default postRouter;
