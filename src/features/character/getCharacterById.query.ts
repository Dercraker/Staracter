import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export const GetCharacterByIdQuery = async (characterId: string) =>
  await prisma.character.findFirst({
    where: {
      id: characterId,
    },
  });

export type GetCharacterByIdQuery = Prisma.PromiseReturnType<
  typeof GetCharacterByIdQuery
>;
