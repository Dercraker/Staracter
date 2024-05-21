import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import type { GetPaginatedLikedCharactersByUserSchema } from './getPaginatedLikedCharactersByUser.schema';

export const GetPaginatedLikedCharactersByUserQuery = async ({
  params: { skip, take },
  userId,
}: GetPaginatedLikedCharactersByUserSchema) => {
  const characters = await prisma.character.findMany({
    skip: (skip - 1) * take,
    take,
    where: {
      likes: {
        some: {
          userId,
        },
      },
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

export type GetPaginatedLikedCharactersByUserQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetPaginatedLikedCharactersByUserQuery>
>;

export type LikedCharacter =
  GetPaginatedLikedCharactersByUserQuery extends (infer U)[] ? U : never;
