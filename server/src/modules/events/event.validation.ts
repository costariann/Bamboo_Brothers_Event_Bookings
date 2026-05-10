import z from 'zod';

export const createEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters long')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug must be URL-friendly (lowercase letters, numbers, and hyphens only)',
    ),
  description: z.string().optional(),
  location: z.string().min(2),
  eventDate: z.iso.datetime({
    message: 'Invalid date format. Use ISO 8601 format.',
  }),
});
