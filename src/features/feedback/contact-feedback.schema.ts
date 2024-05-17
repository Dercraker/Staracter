import { z } from 'zod';

export const ContactFeedbackSchema = z.object({
  email: z.string().min(1).email(),
  review: z.number().min(1),
  message: z.string().min(1),
});

export type ContactFeedbackSchemaType = z.infer<typeof ContactFeedbackSchema>;
