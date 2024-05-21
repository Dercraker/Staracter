import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export const GetTotalCharacterDownloadByUserIdQuery = async (
  userId: string
) => {
  const count = await prisma.character.aggregate({
    _sum: {
      downloadCount: true,
    },
    where: {
      userId: userId,
    },
  });

  return count._sum.downloadCount;
};

export type GetTotalCharacterDownloadByUserIdQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetTotalCharacterDownloadByUserIdQuery>
>;
