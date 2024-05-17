'use client';

import { editPasswordAction } from '@/features/account/edit-profile.action';
import type { EditPasswordFormType } from '@/features/account/edit-profile.schema';
import { EditPasswordFormSchema } from '@/features/account/edit-profile.schema';
import useNotify from '@/hook/useNotify';
import { Accordion, Button, PasswordInput, Stack } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconPassword, IconPlus } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import styles from './EditPassword.module.css';

export const EditPasswordForm = () => {
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: zodResolver(EditPasswordFormSchema),
  });
  const { SuccessNotify, ErrorNotify } = useNotify();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: EditPasswordFormType) => {
      const { serverError } = await editPasswordAction(values);
      if (serverError) {
        return ErrorNotify({
          message: serverError,
        });
      }
    },
    onSuccess: () => {
      SuccessNotify({
        message: 'Password updated',
      });
      form.reset();
    },
  });

  return (
    <Accordion
      my="xl"
      classNames={{ chevron: styles.chevron }}
      chevron={<IconPlus stroke={3} size={48} />}
    >
      <Accordion.Item value="EditPassword">
        <Accordion.Control icon={<IconPassword />}>
          Change Password
        </Accordion.Control>
        <Accordion.Panel>
          <form>
            <Stack>
              <PasswordInput
                label="Current Password"
                {...form.getInputProps('currentPassword')}
              />
              <PasswordInput
                label="New Password"
                {...form.getInputProps('newPassword')}
              />
              <PasswordInput
                label="Confirm new Password"
                {...form.getInputProps('confirmPassword')}
              />
              <Button
                onClick={() => mutateAsync(form.values)}
                disabled={isPending}
                loading={isPending}
              >
                Save
              </Button>
            </Stack>
          </form>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
