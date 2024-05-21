import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import type { LikeCharacterSchema } from './likeCharacter.schema';

export const UnlikeCharacterQuery = async ({
  characterId,
  userId,
}: LikeCharacterSchema) => {
  await prisma.characterLike.delete({
    where: {
      userId_characterId: {
        characterId,
        userId,
      },
    },
  });
};

export type UnlikeCharacterQuery = NonNullable<
  Prisma.PromiseReturnType<typeof UnlikeCharacterQuery>
>;
