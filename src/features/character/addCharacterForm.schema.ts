import { z } from 'zod';

export const AddCharacterFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  pictureId: z.string().min(1, 'Picture Id is required'),
  fileId: z.string().min(1, 'Character file Id is required'),
});

export type AddCharacterFormSchema = z.infer<typeof AddCharacterFormSchema>;
