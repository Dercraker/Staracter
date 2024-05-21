import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export const GetFileByIdQuery = async (fileId: string) =>
  await prisma.file.findFirst({
    where: {
      id: fileId,
    },
  });

export type GetFileByIdQueryType = Prisma.PromiseReturnType<
  typeof GetFileByIdQuery
>;
