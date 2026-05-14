import { PaymentStatus } from '../../generated/prisma/enums';
import { initializePayment } from '../../services/paystack.service';
import { AppError } from '../../utils/AppError';
import * as repository from './order.respository';

export const createOrderService = async (data: {
  eventId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;

  attendees: {
    fullName: string;
  }[];
}) => {
  //Check event
  const event = await repository.getEventById(data.eventId);

  if (!event) {
    throw new AppError('Event not found', 404);
  }

  //Quantity validation
  const quantity = data.attendees.length;

  if (quantity > event.quantityAvailable) {
    throw new AppError('Not enough tickets available', 400);
  }

  //Calculate total
  const totalAmount = Number(event.ticketPrice) * quantity;

  //Create a pending order
  const order = await repository.createOrder({
    buyerName: data.buyerName,
    buyerEmail: data.buyerEmail,
    buyerPhone: data.buyerPhone,
    quantity,
    totalAmount,
    paymentStatus: PaymentStatus.PENDING,
    event: {
      connect: {
        id: event.id,
      },
    },
  });

  const payment = await initializePayment({
    email: order.buyerEmail,
    amount: Number(order.totalAmount),
    orderId: order.id,
  });

  await repository.updateOrderPaymentReference({
    orderId: order.id,
    paymentReference: payment.reference,
  });

  return {
    order,

    paymentUrl: payment.authorization_url,

    reference: payment.reference,
  };
};
