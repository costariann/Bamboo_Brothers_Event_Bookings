import { Router } from 'express';
import { handlePaystackWebhook } from './payment.controller';

const paymentRouter = Router();

//IMPORTANT: raw body required for signature verification
paymentRouter.post('/webhook/paystack', handlePaystackWebhook);

export default paymentRouter;
