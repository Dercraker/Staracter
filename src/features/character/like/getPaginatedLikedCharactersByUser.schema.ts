import { PaginationParamsSchema } from '@/features/pagination/paginationParams.schema';
import { z } from 'zod';

export const GetPaginatedLikedCharactersByUserSchema = z.object({
  params: PaginationParamsSchema,
  userId: z.string(),
});

export type GetPaginatedLikedCharactersByUserSchema = z.infer<
  typeof GetPaginatedLikedCharactersByUserSchema
>;
