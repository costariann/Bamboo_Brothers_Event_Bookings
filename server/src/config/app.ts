import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { CORS_ORIGIN, NODE_ENV } from './env';

export const createApp = (): express.Application => {
  const app = express();

  //secure middleware
  app.use(helmet());

  //CORS consfiguration
  const corsOptions = {
    origin: CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  app.use(cors(corsOptions));

  //Logging middleware
  if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  //Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  //Server static files from public directory
  app.use(express.static('public'));

  return app;
};
