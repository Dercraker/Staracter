'use client';

import { logger } from '@/lib/logger';
import { LINKS } from '@/utils/NavigationLinks';
import { Button, Group, rem } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

export const LogoutButton = () => {
  const { mutateAsync } = useMutation({
    mutationFn: () => signOut({ callbackUrl: LINKS.Landing.Landing.href }),
    onError: (error) => {
      logger.error('Error while User try logout', error.message, error.stack, {
        label: 'Logout',
      });
    },
  });

  return (
    <Group justify="end">
      <Button
        variant="default"
        onClick={() => mutateAsync()}
        leftSection={
          <IconLogout
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
      >
        Logout
      </Button>
    </Group>
  );
};
