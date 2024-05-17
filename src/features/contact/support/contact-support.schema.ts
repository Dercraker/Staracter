import { z } from 'zod';

export const ContactSupportSchema = z.object({
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject must be at least 10 characters long'),
  message: z.string().min(1, 'Message must be at least 50 characters long'),
});

export type ContactSupportSchemaType = z.infer<typeof ContactSupportSchema>;
