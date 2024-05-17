'use client';

import type { ButtonProps } from '@mantine/core';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';

export type GoBackButtonProps = {
  buttonProps?: ButtonProps;
};

export const GoBackButton = ({ buttonProps }: GoBackButtonProps) => {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} {...buttonProps}>
      Go back
    </Button>
  );
};
