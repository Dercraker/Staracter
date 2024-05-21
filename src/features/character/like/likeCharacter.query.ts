import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import type { LikeCharacterSchema } from './likeCharacter.schema';

export const LikeCharacterQuery = async ({
  characterId,
  userId,
}: LikeCharacterSchema) => {
  await prisma.characterLike.create({
    data: {
      userId,
      characterId,
    },
  });
};

export type LikeCharacterQuery = NonNullable<
  Prisma.PromiseReturnType<typeof LikeCharacterQuery>
>;
