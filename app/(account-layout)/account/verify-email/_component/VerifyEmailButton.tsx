'use client';

import { createVerifyEmailAction } from '@/features/account/verify-email/verify-email.action';
import useNotify from '@/hook/useNotify';
import { Button } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useAction } from 'next-safe-action/hooks';

export const VerifyEmailButton = () => {
  const { SuccessNotify, ErrorNotify } = useNotify();
  const { status, execute } = useAction(createVerifyEmailAction, {
    onError: ({ serverError }) => {
      ErrorNotify({ message: serverError });
    },
    onSuccess: () => {
      SuccessNotify({ message: 'Email sent' });
    },
  });
  return (
    <Button
      variant="white"
      loading={status === 'executing'}
      onClick={() => execute('')}
      leftSection={
        status === 'hasErrored' ? (
          <IconX />
        ) : status === 'hasSucceeded' ? (
          <IconCheck />
        ) : null
      }
    >
      Verify Email
    </Button>
  );
};
