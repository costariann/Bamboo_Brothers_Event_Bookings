import { Prisma } from '../../generated/prisma/client';
import { prisma } from '../../config/prisma';

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  return prisma.order.create({
    data,
    include: {
      event: true,
    },
  });
};

export const decrementEventQuantity = async (
  eventId: string,
  quantity: number,
) => {
  return prisma.event.update({
    where: { id: eventId },
    data: {
      quantityAvailable: {
        decrement: quantity,
      },
    },
  });
};

export const getEventById = async (id: string) => {
  return prisma.event.findUnique({
    where: {
      id,
    },
  });
};

export const updateOrderPaymentReference = async ({
  orderId,
  paymentReference,
}: {
  orderId: string;
  paymentReference: string;
}) => {
  return prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      paymentReference,
    },
  });
};
