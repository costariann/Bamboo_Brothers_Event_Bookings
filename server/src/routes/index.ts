import { Router } from 'express';
import eventRouter from '../modules/events/event.route';

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

export default router;
