import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import type { LikeCharacterSchema } from './likeCharacter.schema';

export const IsCharacterLikeByUserQuery = async ({
  characterId,
  userId,
}: LikeCharacterSchema) => {
  const isLiked = await prisma.characterLike.findFirst({
    where: {
      characterId,
      userId,
    },
  });

  return isLiked != null;
};

export type IsCharacterLikeByUserQuery = NonNullable<
  Prisma.PromiseReturnType<typeof IsCharacterLikeByUserQuery>
>;
