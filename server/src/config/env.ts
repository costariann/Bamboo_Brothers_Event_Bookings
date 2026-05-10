import dotenv from 'dotenv';

//Load environment variables from .env file
dotenv.config();

/**
 * Environment Variables Configuration
 *
 * Validates and exports all required environment variables.
 * Throws error if any required variable is missing.
 */

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

//server configuration
export const NODE_ENV = getEnv('NODE_ENV');
export const PORT = Number.parseInt(getEnv('PORT'), 10);
export const CORS_ORIGIN = getEnv('CORS_ORIGIN');
export const HOST = getEnv('HOST');
export const DB_URL = getEnv('DATABASE_URL');
export const DB_ACCELERATE_URL = getEnv('ACCELERATE_URL');
