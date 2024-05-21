import { z } from 'zod';

export const AddCharacterFileSchema = z.instanceof(FormData);

export type AddCharacterFileSchemaType = z.infer<typeof AddCharacterFileSchema>;
