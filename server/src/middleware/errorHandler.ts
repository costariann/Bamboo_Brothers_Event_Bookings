import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { success } from 'zod';

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error(err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
