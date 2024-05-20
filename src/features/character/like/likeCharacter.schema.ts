import { z } from 'zod';

export const LikeCharacterSchema = z.object({
  characterId: z.string(),
  userId: z.string(),
});

export type LikeCharacterSchema = z.infer<typeof LikeCharacterSchema>;
