import { PrismaClient } from '../generated/prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { DB_ACCELERATE_URL, DB_URL } from './env';

declare global {
  var prisma: ReturnType<typeof createPrismaClient> | undefined;
}

function createPrismaClient() {
  return new PrismaClient({
    accelerateUrl: DB_ACCELERATE_URL!,
    log:
      process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
  }).$extends(withAccelerate());
}

export const prisma = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export async function connectDatabase() {
  await prisma.$connect();
  console.log('Database connected successfully 🗄️');
}
