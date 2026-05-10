import { Prisma } from '../../generated/prisma/client';
import { prisma } from '../../config/prisma';

export const createEvent = async (data: Prisma.EventCreateInput) => {
  return prisma.event.create({
    data,
  });
};

export const getEvents = async () => {
  return prisma.event.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};
