import { auth } from '@/lib/auth/helper';
import type { PageParams } from '@/types/next';
import { SiteConfig } from '@/utils/site-config';
import { redirect } from 'next/navigation';
import SignUpCard from './_component/SignUpCard';

const Page = async ({}: PageParams) => {
  const user = await auth();

  if (user) {
    redirect('/');
  }

  if (!SiteConfig.auth.password) {
    redirect('/auth/signin');
  }

  return <SignUpCard />;
};

export default Page;
