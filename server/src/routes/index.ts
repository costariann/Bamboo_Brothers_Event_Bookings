import { Router } from 'express';
import eventRouter from '../modules/events/event.route';
import ticketTypeRouter from '../modules/ticket-types/ticketType.route';
import authRouter from '../modules/auth/auth.routes';
import adminRouter from '../modules/admin/admin.routes';
import orderRouter from '../modules/orders/order.routes';
import paymentRouter from '../modules/payments/payment.routes';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Bamboo Brothers API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
    },
    clients: {
      web: 'Web app;ication endpoints',
      dashboard: 'Admin dashboard endpoints',
    },
  });
});

router.use('/events', eventRouter);

router.use('/ticket-types', ticketTypeRouter);

router.use('/admins', adminRouter);

router.use('/auth', authRouter);

router.use('/orders', orderRouter);

router.use('/payments', paymentRouter);

export default router;
