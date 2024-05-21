import { z } from 'zod';

export const GetCharacterCountSchema = z.object({
  search: z.string().nullable().optional(),
});

export type GetCharacterCountSchema = z.infer<typeof GetCharacterCountSchema>;
