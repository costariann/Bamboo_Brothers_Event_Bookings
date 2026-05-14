import { Request, Response } from 'express';
import { asyncHandlder } from '../../utils/asyncHandler';
import * as service from './order.service';

export const createOrderController = asyncHandlder(
  async (req: Request, res: Response) => {
    const { eventId, ...payload } = req.body;

    const order = await service.createOrderService({
      eventId,
      ...payload,
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  },
);
