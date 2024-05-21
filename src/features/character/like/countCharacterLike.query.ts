import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export const CountCharacterLikeQuery = async (characterId: string) => {
  const count = await prisma.characterLike.count({
    where: { characterId },
  });

  return count;
};

export type CountCharacterLikeQuery = NonNullable<
  Prisma.PromiseReturnType<typeof CountCharacterLikeQuery>
>;
