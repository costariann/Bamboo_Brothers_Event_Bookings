import { Router } from 'express';

import * as controller from './event.controller';

import { validateRequest } from '../../middleware/validateRequest';
import { createEventSchema } from './event.validation';

const eventRouter = Router();

eventRouter.post(
  '/',
  validateRequest(createEventSchema),
  controller.createEventController,
);

eventRouter.get('/', controller.getEventsController);

export default eventRouter;
