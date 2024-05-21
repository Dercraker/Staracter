import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import type { User } from 'next-auth';
import type { AddCharacterFormSchema } from './addCharacterForm.schema';

export const AddCharacterQuery = async (
  input: AddCharacterFormSchema,
  filesToConnect: string[],
  ctx: { user: User }
) =>
  await prisma.character.create({
    data: {
      ...input,
      userId: ctx.user.id,
      publishDate: new Date(),
      files: {
        connect: filesToConnect.map((fileId) => ({ id: fileId })),
      },
    },
  });

export type AddCharacterQueryType = NonNullable<
  Prisma.PromiseReturnType<typeof AddCharacterQuery>
>;
