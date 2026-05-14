import { Router } from 'express';
import * as controller from './admin.controller';
import { authenticateAdmin } from '../../middleware/authenticateAdmin';
import { authorizeRole } from '../../middleware/authorizeRole';
import { validateRequest } from '../../middleware/validateRequest';
import { createAdminSchema } from './admin.validation';

const adminRouter = Router();

adminRouter.post(
  '/',
  authenticateAdmin,
  authorizeRole('SUPER_ADMIN'),
  validateRequest(createAdminSchema),
  controller.createAdminController,
);

adminRouter.get('/', authenticateAdmin, controller.getAdminsCotroller);

adminRouter.get('/:id', authenticateAdmin, controller.getAdminByIdController);

export default adminRouter;
