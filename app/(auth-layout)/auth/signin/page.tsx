import { SignInCard } from '@/components/auth/signIn/SignInCard';
import { auth } from '@/lib/auth/helper';
import type { PageParams } from '@/types/next';
import { RedirectType, redirect } from 'next/navigation';

const RoutePage = async ({}: PageParams) => {
  const user = await auth();

  if (user) redirect('/', RedirectType.push);

  return (
    <SignInCard
      withBorder
      w={{ base: '90vw', xs: '50vw' }}
      mx={{ base: 0, xs: '25%' }}
      py="xl"
    />
  );
};

export default RoutePage;
