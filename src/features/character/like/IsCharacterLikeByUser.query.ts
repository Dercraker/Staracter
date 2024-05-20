import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import type { LikeCharacterSchema } from './likeCharacter.schema';

export const IsCharacterLikeByUserQuery = async ({
  characterId,
  userId,
}: LikeCharacterSchema) => {
  if (!userId) return false;

  const isLiked = await prisma.characterLike.findUnique({
    where: {
      userId_characterId: {
        userId,
        characterId,
      },
    },
  });

  return isLiked != null;
};

export type IsCharacterLikeByUserQuery = NonNullable<
  Prisma.PromiseReturnType<typeof IsCharacterLikeByUserQuery>
>;
