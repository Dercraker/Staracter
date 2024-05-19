import { PaginationParamsSchema } from '@/features/pagination/paginationParams.schema';
import { z } from 'zod';

export const GetPaginatedCharacterByUserSchema = z.object({
  params: PaginationParamsSchema,
  userId: z.string(),
});

export type GetPaginatedCharacterByUserSchema = z.infer<
  typeof GetPaginatedCharacterByUserSchema
>;
