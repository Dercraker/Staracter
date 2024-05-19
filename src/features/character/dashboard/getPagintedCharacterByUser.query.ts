import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import type { GetPaginatedCharacterByUserSchema } from './getPaginatedCharacterByUser.schema';

export const GetPaginatedCharactersByUserQuery = async ({
  params: { skip, take },
  userId,
}: GetPaginatedCharacterByUserSchema) => {
  const characters = prisma.character.findMany({
    skip: (skip - 1) * take,
    take,
    where: {
      userId,
    },
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

  return characters;
};

export type GetPaginatedCharactersByUserQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetPaginatedCharactersByUserQuery>
>;
