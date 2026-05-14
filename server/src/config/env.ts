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
export const JWT_SECRET = getEnv('JWT_SECRET');
export const JWT_EXPIRES_IN = getEnv('JWT_EXPIRES_IN');
export const SUPER_ADMIN_EMAIL = getEnv('SUPER_ADMIN_EMAIL');
export const SUPER_ADMIN_PASSWORD = getEnv('SUPER_ADMIN_PASSWORD');
export const PAYSTACK_SECRET_KEY = getEnv('PAYSTACK_SECRET_KEY');
export const PAYSTACK_CALLBACK_URL = getEnv('PAYSTACK_CALLBACK_URL');
export const PAYSTACK_BASE_URL = getEnv('PAYSTACK_BASE_URL');
