import { Router } from 'express';
import * as postController from './post.controller';
import { authJWT } from '../../../services/auth.services';

const postRouter = new Router();

// POST /api/v1/posts
postRouter.post('/', authJWT, postController.createPost);

export default postRouter;
