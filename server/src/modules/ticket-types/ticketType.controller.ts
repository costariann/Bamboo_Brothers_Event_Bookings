import { Request, Response } from 'express';
import * as service from './ticketType.service';
export const createTicketTypeController = async (
  req: Request,
  res: Response,
) => {
  const ticketType = await service.createTicketTypeService(req.body);

  res.status(201).json({
    success: true,
    data: ticketType,
  });
};

export const getTicketTypesController = async (req: Request, res: Response) => {
  const ticketTypes = await service.getTicketTypesService();

  res.status(200).json({
    success: true,
    data: ticketTypes,
  });
};

export const getTicketTypesByEventController = async (
  req: Request<{ eventId: string }>,
  res: Response,
) => {
  const { eventId } = req.params;
  const ticketTypes = await service.getTicketTypesByEventService(eventId);

  res.status(200).json({
    success: true,
    data: ticketTypes,
  });
};
