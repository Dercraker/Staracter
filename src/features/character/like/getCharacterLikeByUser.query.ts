import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import type { LikeCharacterSchema } from './likeCharacter.schema';

export const GetCharacterLikeByUserQuery = async ({
  characterId,
  userId,
}: LikeCharacterSchema) => {
  const likes = await prisma.characterLike.findFirst({
    where: {
      characterId,
      userId,
    },
  });

  return likes;
};

export type GetCharacterLikeByUserQuery = Prisma.PromiseReturnType<
  typeof GetCharacterLikeByUserQuery
>;
