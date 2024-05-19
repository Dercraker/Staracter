import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export const GetCharacterLikeCountByUserIdQuery = async (userId: string) => {
  const count = await prisma.characterLike.count({
    where: {
      character: {
        userId,
      },
    },
  });

  return count;
};

export type GetCharacterLikeCountByUserIdQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetCharacterLikeCountByUserIdQuery>
>;
