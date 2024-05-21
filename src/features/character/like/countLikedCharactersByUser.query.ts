import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export const CountLikedCharactersByUserQuery = async (userId: string) => {
  const count = await prisma.characterLike.count({
    where: { userId },
  });

  return count;
};

export type CountLikedCharactersByUserQuery = NonNullable<
  Prisma.PromiseReturnType<typeof CountLikedCharactersByUserQuery>
>;
