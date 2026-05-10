import z from 'zod';

export const createTicketSchema = z.object({
  name: z.string().min(2),

  price: z.number().positive(),

  quantityAvailable: z.number().int().positive(),

  eventId: z.string().min(1, 'Event ID is required'),
});
