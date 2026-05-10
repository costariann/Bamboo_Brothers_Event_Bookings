import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'node:http';
import { CORS_ORIGIN } from './env';

/**
 * Socket.IO Configuration
 *
 * This file sets up real-time communication using Socket.IO.
 * Used for live updates, notifications, and real-time features
 * across web, mobile, and dashboard clients.
 */

export const initializeSocket = (httpServer: HTTPServer): SocketIOServer => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: CORS_ORIGIN,
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  io.on('connection', (socket: Socket) => {
    console.log(`✅ Client connected: ${socket.id}`);

    // Handle client disconnection
    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });

    // Example: Handle custom events
    // socket.on('custom-event', (data) => {
    //   // Handle event
    // });
  });

  return io;
};

// Export socket instance type for use in other files
export type SocketInstance = SocketIOServer;
