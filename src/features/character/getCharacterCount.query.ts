import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import type { GetCharacterCountSchema } from './getCharacterCount.schema';

export const GetCharacterCountQuery = async ({
  search,
}: GetCharacterCountSchema) => {
  const characterCount = await prisma.character.count({
    where:
      search && search !== ''
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { user: { name: { contains: search, mode: 'insensitive' } } },
              { downloadCount: { equals: parseInt(search) || undefined } },
            ],
          }
        : undefined,
  });

  return characterCount;
};

export type GetCharacterCountQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetCharacterCountQuery>
>;
