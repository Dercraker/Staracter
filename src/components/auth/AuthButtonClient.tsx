'use client';

import type { ButtonProps } from '@mantine/core';
import { useSession } from 'next-auth/react';
import LoggedInButton from './LoggedInButton';
import SignInButton from './SignInButton';

type AuthButtonClientProps = {
  buttonProps?: ButtonProps;
};
const AuthButtonClient = ({ buttonProps }: AuthButtonClientProps) => {
  const session = useSession();

  if (session.status === 'authenticated' && session.data.user.id)
    return <LoggedInButton user={session.data.user} />;

  return <SignInButton buttonProps={buttonProps} />;
};

export default AuthButtonClient;
