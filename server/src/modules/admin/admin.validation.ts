import z from 'zod';

export const createAdminSchema = z.object({
  name: z.string().min(2),

  email: z.email(),

  password: z.string().min(6),

  role: z.enum(['SUPER_ADMIN', 'GATE_ADMIN']),
});
