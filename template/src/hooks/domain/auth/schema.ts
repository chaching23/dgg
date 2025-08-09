import { z } from 'zod';

export const authUserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
});

export type AuthUser = z.infer<typeof authUserSchema>;

export const authTokenSchema = z.object({
  accessToken: z.string().min(1),
});

export type AuthToken = z.infer<typeof authTokenSchema>;

