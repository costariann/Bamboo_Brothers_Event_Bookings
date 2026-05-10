import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        errors: result.error.issues, // ✅ Zod v4 way
      });
    }

    req.body = result.data;
    next();
  };
};
