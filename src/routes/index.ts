import { Router } from 'express';
import transformRouter from './transform';

const routes = Router();
routes.use('/transform', transformRouter);

export default routes;
