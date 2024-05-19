import { SignInCard } from '@/components/auth/signIn/SignInCard';
import { auth } from '@/lib/auth/helper';
import type { PageParams } from '@/types/next';
import { Center } from '@mantine/core';
import { RedirectType, redirect } from 'next/navigation';

const RoutePage = async ({}: PageParams) => {
  const user = await auth();

  if (user) redirect('/', RedirectType.push);

  return (
    <Center>
      <SignInCard withBorder w={{ base: '90vw', xs: '32em' }} py="xl" />
    </Center>
  );
};

export default RoutePage;
