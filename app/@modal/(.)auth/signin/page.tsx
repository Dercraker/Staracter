'use client';

import { SignInCard } from '@/components/auth/signIn/SignInCard';
import { LINKS } from '@/utils/NavigationLinks';
import { Modal } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';

const RoutePage = () => {
  const router = useRouter();
  const path = usePathname();

  return (
    <Modal.Root
      opened={path.endsWith(LINKS.Auth.SignIn.href)}
      onClose={() => router.back()}
      size={'auto'}
    >
      <Modal.Overlay backgroundOpacity={0.55} blur={3} />
      <Modal.Content>
        <SignInCard withBorder w={{ base: '90vw', xs: '50vw' }} py="xl" />
      </Modal.Content>
    </Modal.Root>
  );
};

export default RoutePage;
