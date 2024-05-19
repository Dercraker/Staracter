import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export const GetCharacterCountByUserQuery = async (userId: string) => {
  const count = await prisma.character.count({
    where: {
      userId,
    },
  });

  return count;
};

export type GetCharacterCountByUserQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetCharacterCountByUserQuery>
>;
