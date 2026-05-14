import { Router } from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { createTicketSchema } from './ticketType.validation';
import * as controller from './ticketType.controller';

const ticketTypeRouter = Router();

ticketTypeRouter.post(
  '/',
  validateRequest(createTicketSchema),
  controller.createTicketTypeController,
);

ticketTypeRouter.get('/', controller.getTicketTypesController);

ticketTypeRouter.get(
  '/event/:eventId',
  controller.getTicketTypesByEventController,
);

export default ticketTypeRouter;
