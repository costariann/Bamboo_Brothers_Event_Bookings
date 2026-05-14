import { Prisma } from '../../generated/prisma/client';
import { prisma } from '../../config/prisma';

export const createTicketType = async (data: Prisma.TicketTypeCreateInput) => {
  return prisma.ticketType.create({
    data,
  });
};

export const getTicketTypes = async () => {
  return prisma.ticketType.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getTicketTypesByEvent = async (eventId: string) => {
  return prisma.ticketType.findMany({
    where: { eventId },
  });
};
