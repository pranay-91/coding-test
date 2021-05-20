import { Router, Request, Response } from 'express';
import transformRouter from './transform';
import HttpStatus from 'http-status-codes';

const routes = Router();

// Endpoint for health check.
routes.get('/healthz', (req: Request, res: Response) => {
  res.status(HttpStatus.OK).json();
});

// using transform Router
routes.use('/transform', transformRouter);

export default routes;
