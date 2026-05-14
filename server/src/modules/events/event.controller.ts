import { Prisma } from '../../generated/prisma/client';
import { asyncHandlder } from '../../utils/asyncHandler';
import * as service from './event.service';
import { Request, Response } from 'express';

export const createEventController = asyncHandlder(
  async (req: Request<{}, {}, Prisma.EventCreateInput>, res: Response) => {
    const event = await service.createEventService(req.body);

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event,
    });
  },
);

export const getEventsController = asyncHandlder(
  async (req: Request, res: Response) => {
    const events = await service.getEventService();

    res.status(200).json({
      success: true,
      message: 'Events fetched successfully',
      data: events,
    });
  },
);
