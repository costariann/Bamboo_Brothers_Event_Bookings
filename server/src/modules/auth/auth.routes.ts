import { Router } from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { loginController } from './auth.controller';
import { loginSchema } from './auth.validation';

const authRouter = Router();

authRouter.post('/login', validateRequest(loginSchema), loginController);

export default authRouter;
