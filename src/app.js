import express from 'express';
import middlewares from './config/middlewares';
import addroutes from './routes';

const app = express();
middlewares(app);
addroutes(app);

export default app;
