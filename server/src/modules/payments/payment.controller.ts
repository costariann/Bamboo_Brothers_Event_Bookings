import { Request, Response } from 'express';
import { asyncHandlder } from '../../utils/asyncHandler';
import { PAYSTACK_SECRET_KEY } from '../../config/env';
import crypto from 'node:crypto';
import { AppError } from '../../utils/AppError';
import * as service from './payment.service';

export const handlePaystackWebhook = asyncHandlder(
  async (req: Request, res: Response) => {
    const secret = PAYSTACK_SECRET_KEY!;

    const rawBody = req.body.toString();

    const hash = crypto
      .createHmac('sha512', secret)
      .update(rawBody)
      .digest('hex');

    const signature = req.headers['x-paystack-signature'] as string;

    if (hash !== signature) {
      throw new AppError('Invalid Paystack signature', 401);
    }

    const event = JSON.parse(rawBody);

    await service.processPaystackEvent(event);

    return res.sendStatus(200);
  },
);
