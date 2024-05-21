import { z } from 'zod';
import { PaginationParamsSchema } from '../pagination/paginationParams.schema';

export const GetPaginatedCharacterSchema = z.object({
  params: PaginationParamsSchema,
  search: z.string().nullable().optional(),
});

export type GetPaginatedCharacterSchema = z.infer<
  typeof GetPaginatedCharacterSchema
>;
