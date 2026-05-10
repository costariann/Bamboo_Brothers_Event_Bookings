import http from 'node:http';
import { createApp } from './config/app';
import { initializeSocket } from './config/socket';
import { Request, Response } from 'express';
import apiRoutes from './routes';

const app = createApp();
const server = http.createServer(app);

// Initialize Socket.IO for real-time communication
const io = initializeSocket(server);

export { io };

//Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message:
      'Bamboo Brothers Event Bookings API 2026 - Typescript Blazing fast!',
    status: 'OK',
    timeStamp: new Date().toISOString(),
  });
});

//API routes
app.use('/api', apiRoutes);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

import { PORT, HOST } from './config/env';
import { notFoundHandler } from './middleware/notFoundHandler';
import { errorHandler } from './middleware/errorHandler';
import { connectDatabase } from './config/prisma';

const PORT_NUMBER = PORT;
const HOST_ADDRESS = HOST;

async function startServer() {
  try {
    await connectDatabase();

    server.listen(PORT_NUMBER, HOST_ADDRESS, () => {
      console.log(`Bamboo Brothers' API RUNNING ON PORT ${PORT_NUMBER}🚀`);
      console.log(
        `Bamboo Brothers' API LISTENING ON http://${HOST_ADDRESS}:${PORT_NUMBER}🔥`,
      );
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
