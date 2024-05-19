import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import type { GetPaginatedCharacterSchema } from './GetPaginatedCharacters.schema';

export const GetPaginatedCharactersQuery = async ({
  params: { skip, take },
  search,
}: GetPaginatedCharacterSchema) => {
  const characters = prisma.character.findMany({
    skip: (skip - 1) * take,
    take,
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
    orderBy: {
      publishDate: 'desc',
    },
    select: {
      id: true,
      name: true,
      publishDate: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      pictureId: true,
      fileId: true,
      files: {
        select: {
          id: true,
          fileName: true,
          originalName: true,
          url: true,
        },
      },
      downloadCount: true,
      Tag: {
        distinct: 'tagId',
        select: {
          tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  return { ...characters };
};

export type GetPaginatedCharactersQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetPaginatedCharactersQuery>
>;

export type GetPaginatedCharacter =
  GetPaginatedCharactersQuery extends (infer U)[] ? U : never;
