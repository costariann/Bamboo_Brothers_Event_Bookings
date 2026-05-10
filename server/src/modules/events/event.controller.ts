import { Prisma } from '../../generated/prisma/client';
import * as service from './event.service';
import { Request, Response } from 'express';

export const createEventController = async (
  req: Request<{}, {}, Prisma.EventCreateInput>,
  res: Response,
) => {
  const event = await service.createEventService(req.body);

  res.status(201).json({
    success: true,
    data: event,
  });
};

export const getEventsController = async (req: Request, res: Response) => {
  const events = await service.getEventService();

  res.status(200).json({
    success: true,
    data: events,
  });
};
