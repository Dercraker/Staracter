'use client';

import { useHref } from '@/hook/useHref';
import { LINKS } from '@/utils/NavigationLinks';
import type { ButtonProps } from '@mantine/core';
import { Button } from '@mantine/core';
import Link from 'next/link';

type SignInButtonProps = {} & ButtonProps;

const SignInButton = ({ ...props }: SignInButtonProps) => {
  const href = useHref();

  return (
    <Button
      component={Link}
      href={`${LINKS.Auth.SignIn.href}?callbackUrl=${href}`}
      variant="outline"
      {...props}
    >
      Sign In
    </Button>
  );
};

export default SignInButton;
