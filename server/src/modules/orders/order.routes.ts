import { Router } from 'express';

import * as controller from './order.controller';

import { validateRequest } from '../../middleware/validateRequest';

import { createOrderSchema } from './order.validation';

const orderRouter = Router();

orderRouter.post(
  '/',
  validateRequest(createOrderSchema),

  controller.createOrderController,
);

export default orderRouter;
