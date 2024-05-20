'use client';

import { LikeCharacterAction } from '@/features/character/like/likeCharacter.action';
import useNotify from '@/hook/useNotify';
import { ActionIcon, Group } from '@mantine/core';
import { IconHearts } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import type { User } from 'next-auth';
import { useRouter } from 'next/navigation';

export type LikeButtonProps = {
  likeCount: number;
  authUser: User | null;
  characterId: string;
  liked?: boolean;
};

export const LikeButton = ({
  likeCount,
  authUser,
  characterId,
  liked,
}: LikeButtonProps) => {
  const router = useRouter();
  const { ErrorNotify, SuccessNotify } = useNotify();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async ([characterId, userId]: [string, string]) => {
      const { serverError } = await LikeCharacterAction({
        characterId,
        userId,
      });
      if (serverError) return ErrorNotify({ message: serverError });

      SuccessNotify({
        title: 'Favorite character has been updated',
      });

      router.refresh();
    },
  });

  return (
    <Group
      align="center"
      justify="center"
      gap={0}
      onClick={async () => mutateAsync([characterId, authUser?.id as string])}
    >
      <ActionIcon
        variant="subtle"
        disabled={authUser === null}
        loading={isPending}
      >
        <IconHearts
          color={
            liked
              ? 'var(--mantine-color-yellow-8)'
              : 'var(--mantine-color-pink-5)'
          }
        />{' '}
      </ActionIcon>
      {String(likeCount)}
    </Group>
  );
};
