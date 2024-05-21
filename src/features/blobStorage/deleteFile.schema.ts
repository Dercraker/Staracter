import { z } from 'zod';

export const DeleteFileSchema = z.object({
  fileId: z.string(),
});

export type DeleteFileSchema = z.infer<typeof DeleteFileSchema>;
