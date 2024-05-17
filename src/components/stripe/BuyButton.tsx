'use client';

import { buyButtonAction } from '@/features/stripe/buyButton.action';
import useNotify from '@/hook/useNotify';
import { LINKS } from '@/utils/NavigationLinks';
import { getServerUrl } from '@/utils/server-url';
import type { ButtonProps } from '@mantine/core';
import { Button } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export type BuyButtonProps = {
  priceId: string;
} & ButtonProps;

export const BuyButton = ({ priceId, ...props }: BuyButtonProps) => {
  const { ErrorNotify } = useNotify();
  const session = useSession();

  const router = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const { data, serverError } = await buyButtonAction({
        priceId,
      });

      if (data) {
        router.push(data.url);
        return;
      }

      ErrorNotify({
        title: serverError ?? 'Something went wrong',
      });
    },
  });

  const handleClickButton = async () => {
    if (!session.data) {
      router.push(
        `${LINKS.Auth.SignIn.href}?callbackUrl=${getServerUrl()}/#pricing`
      );
      return;
    }

    await mutateAsync();
  };

  return (
    <Button
      onClick={handleClickButton}
      {...props}
      disabled={isPending}
      loading={isPending}
    />
  );
};
