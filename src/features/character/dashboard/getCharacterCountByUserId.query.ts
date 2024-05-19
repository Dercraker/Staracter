import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export const GetCharacterCountByUserIdQuery = async (userId: string) => {
  const count = await prisma.character.count({
    where: {
      userId: userId,
    },
  });

  return count;
};

export type GetCharacterCountByUserIdQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetCharacterCountByUserIdQuery>
>;
