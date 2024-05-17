'use client';

import useNotify from '@/hook/useNotify';
import { logger } from '@/lib/logger';
import { LINKS } from '@/utils/NavigationLinks';
import { Menu, rem } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

const LogoutMenuItem = () => {
  const { ErrorNotify } = useNotify();

  const logoutMutation = useMutation({
    mutationFn: () => signOut(),
    onSettled: () => {
      redirect(LINKS.Landing.Landing.href);
    },
    onError: (error) => {
      logger.error('Error while User try logout', error.message, error.stack, {
        label: 'Logout',
      });
      return ErrorNotify({
        title: 'Error',
        message: error.message,
      });
    },
  });

  return (
    <Menu.Item
      leftSection={
        <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
      }
      onClick={() => logoutMutation.mutateAsync()}
    >
      Logout
    </Menu.Item>
  );
};

export default LogoutMenuItem;
