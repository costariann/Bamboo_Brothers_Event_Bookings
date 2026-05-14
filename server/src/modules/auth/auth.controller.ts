import { Request, Response } from 'express';
import { loginService } from './auth.service';
import { asyncHandlder } from '../../utils/asyncHandler';

export const loginController = asyncHandlder(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await loginService(email, password);

    res.status(200).json({
      success: true,
      data: result,
    });
  },
);
