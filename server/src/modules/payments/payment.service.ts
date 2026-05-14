import { io } from '../..';
import { prisma } from '../../config/prisma';
import { ACTIVITY_ACTIONS } from '../../constants/activityActions';
import { PaymentStatus } from '../../generated/prisma/enums';
import { logActivity } from '../activity-logs/activityLog.service';

export const processPaystackEvent = async (event: any) => {
  if (event.event !== 'charge.success') return;

  const reference = event.data.reference;

  //1. Find Order
  const order = await prisma.order.findFirst({
    where: { paymentReference: reference },
    include: { event: true },
  });

  if (!order) return;

  //2. Prevent duplicate processing
  if (order.paymentStatus === PaymentStatus.PAID) return;

  //3. Mark order as PAID
  await prisma.order.update({
    where: { id: order.id },
    data: {
      paymentStatus: PaymentStatus.PAID,
    },
  });

  await prisma.event.update({
    where: {
      id: order.eventId,
    },
    data: {
      quantityAvailable: {
        decrement: order.quantity,
      },
    },
  });

  //4. Emit real-time update
  io.emit('payment-success', {
    orderId: order.id,
    event: order.eventId,
  });

  //5. Log activity
  await logActivity({
    action: ACTIVITY_ACTIONS.PAYMENT_COMPLETED,
    entityType: 'ORDER',
    entityId: order.id,
    description: `Payment confirmed for order ${order.id}`,
  });

  console.log('✅ Payment processed:', order.id);
};
