import { z } from 'zod';

export const ProfileFormSchema = z.object({
  name: z.string().min(1, 'Name is required').optional().nullable(),
  email: z.string().email('Invalid email'),
});

export const EditPasswordFormSchema = z
  .object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.currentPassword != data.newPassword, {
    message: 'Current password and new password must be different',
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New password and confirm password must match',
    path: ['newPassword', 'confirmPassword'],
  });

export type ProfileFormType = z.infer<typeof ProfileFormSchema>;
export type EditPasswordFormType = z.infer<typeof EditPasswordFormSchema>;
