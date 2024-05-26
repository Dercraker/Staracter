'use client';

import { LikeCharacterAction } from '@/features/character/like/likeCharacter.action';
import useNotify from '@/hook/useNotify';
import { ActionIcon, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHearts } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import type { User } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  const { ErrorNotify, SuccessNotify } = useNotify();
  const router = useRouter();
  const [totalLike, setTotalLike] = useState(likeCount);
  const [isLiked, { open: likeCard, close: dislikeCard }] =
    useDisclosure(liked);

  useEffect(() => {
    if (liked) likeCard();
    else dislikeCard();
  }, [liked]);

  useEffect(() => {
    setTotalLike(likeCount);
  }, [likeCount]);

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
    onMutate() {
      if (isLiked) {
        dislikeCard();
        setTotalLike((prev) => prev - 1);
      } else {
        likeCard();
        setTotalLike((prev) => prev + 1);
      }
    },
  });

  const handleUpdateLike = async () => {
    await mutateAsync([characterId, authUser?.id as string]);
  };

  return (
    <Group
      align="center"
      justify="center"
      gap={0}
      onClick={handleUpdateLike}
      className="cursor-pointer"
    >
      <ActionIcon
        variant="transparent"
        disabled={authUser === null}
        loading={isPending}
      >
        <IconHearts
          color={
            isLiked
              ? 'var(--mantine-color-yellow-8)'
              : 'var(--mantine-color-pink-5)'
          }
        />{' '}
      </ActionIcon>
      {String(totalLike)}
    </Group>
  );
};
