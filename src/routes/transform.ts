import { Router, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { transformRecursive } from '@/helper/transform';
import { Payload, Data } from '@/types/shared';
import { transformSchema } from './schema/transform';

const router = Router();

/**
 * Transform POST routes.
 * Returns transformed payload replacing payload with reference Data.
 */
router.post('/', (req: Request, res: Response) => {
  try {
    const { body } = req;
    const result = transformSchema.validate(req.body);
    if (result.error) {
      res.status(HttpStatus.BAD_REQUEST).json({ reason: 'Validation Error', message: result.error.message });
    } else {
      const data: Data = { ...body };
      const payload: Payload = { ...data.payload };
      transformRecursive(payload, data.referenceData);
      res.status(HttpStatus.OK).json(payload);
    }
  } catch (e) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ reason: 'Could not transform payload.' });
  }
});

export default router;
