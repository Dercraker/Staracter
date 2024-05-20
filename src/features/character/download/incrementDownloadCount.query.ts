import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export const IncrementDownloadCountQuery = async (
  characterId: string,
  currentCount: number
) =>
  await prisma.character.update({
    where: {
      id: characterId,
    },
    data: {
      downloadCount: currentCount + 1,
    },
  });

export type IncrementDownloadCountQueryType = NonNullable<
  Prisma.PromiseReturnType<typeof IncrementDownloadCountQuery>
>;
