'use client';

import { updateProfileAction } from '@/features/account/edit-profile.action';
import type { ProfileFormType } from '@/features/account/edit-profile.schema';
import { ProfileFormSchema } from '@/features/account/edit-profile.schema';
import { createVerifyEmailAction } from '@/features/account/verify-email/verify-email.action';
import useNotify from '@/hook/useNotify';
import { Button, Group, Stack, TextInput, Tooltip } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import type { User } from '@prisma/client';
import { IconCircleCheck } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export type EditProfilFormProps = {
  defaultValues: User;
};

export const EditProfilForm = ({ defaultValues }: EditProfilFormProps) => {
  const { SuccessNotify, ErrorNotify } = useNotify();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: defaultValues,
    validate: zodResolver(ProfileFormSchema),
  });
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: ProfileFormType) => {
      const { data, serverError } = await updateProfileAction(values);

      if (values.email !== defaultValues.email) {
        const { serverError } = await createVerifyEmailAction(values.email);

        if (!serverError)
          SuccessNotify({
            message:
              'You have updated your email. We have sent you a new email verification link.',
          });
        return;
      }

      if (!data) {
        return ErrorNotify({
          message: serverError,
        });
      }
    },
    onSuccess: () => {
      SuccessNotify({
        message: 'Profile updated',
      });

      router.refresh();
    },
  });

  return (
    <Stack>
      <TextInput label="Name" withAsterisk {...form.getInputProps('name')} />
      <TextInput
        leftSection={
          defaultValues.emailVerified && (
            <Tooltip label="Email verified. If you change your email, you will need to verify it again.">
              <IconCircleCheck color="var(--mantine-color-teal-6)" />
            </Tooltip>
          )
        }
        label="Email"
        withAsterisk
        {...form.getInputProps('email')}
      />
      <Group>
        <Button
          disabled={!form.isValid() || isPending}
          loading={isPending}
          onClick={() => mutateAsync(form.values)}
        >
          Save
        </Button>
      </Group>
    </Stack>
  );
};
