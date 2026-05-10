import { Router } from 'express';

import * as controller from './event.controller';

import { createEventSchema } from '../event.validation';
import { validateRequest } from '../../middleware/validateRequest';

const eventRouter = Router();

eventRouter.post(
  '/',
  validateRequest(createEventSchema),
  controller.createEventController,
);

eventRouter.get('/', controller.getEventsController);

export default eventRouter;
