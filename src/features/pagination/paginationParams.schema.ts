import { z } from 'zod';

export const PaginationParamsSchema = z.object({
  skip: z.number(),
  take: z.number(),
});

export type PaginationParamsSchema = z.infer<typeof PaginationParamsSchema>;
