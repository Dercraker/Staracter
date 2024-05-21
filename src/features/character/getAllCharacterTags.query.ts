import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export const GetAllCharacterTagsQuery = async () => {
  const tags = await prisma.tag.findMany({
    distinct: 'name',
    select: {
      id: true,
      name: true,
    },
  });

  return tags;
};

export type GetAllCharacterTagsQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetAllCharacterTagsQuery>
>;

export type CharacterTag = GetAllCharacterTagsQuery extends (infer U)[]
  ? U
  : never;
