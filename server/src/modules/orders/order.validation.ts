import z from 'zod';

export const createOrderSchema = z.object({
  eventId: z.string().min(1),
  buyerName: z.string().min(2),
  buyerEmail: z.email(),
  buyerPhone: z.string().min(10),
  attendees: z
    .array(
      z.object({
        fullName: z.string().min(2),
      }),
    )
    .min(1),
});
