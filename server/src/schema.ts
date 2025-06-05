
import { z } from 'zod';

// Button configuration schema
export const buttonConfigSchema = z.object({
  id: z.number(),
  text: z.string(),
  color: z.string(),
  action: z.string().nullable(),
  created_at: z.coerce.date()
});

export type ButtonConfig = z.infer<typeof buttonConfigSchema>;

// Input schema for creating button config
export const createButtonConfigInputSchema = z.object({
  text: z.string(),
  color: z.string(),
  action: z.string().nullable()
});

export type CreateButtonConfigInput = z.infer<typeof createButtonConfigInputSchema>;
