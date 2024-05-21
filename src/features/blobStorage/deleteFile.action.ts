'use server';

import { env } from '@/lib/env/server';
import { deleteFileFromBucket } from '@/lib/objectStorage/minio';
import { prisma } from '@/lib/prisma';
import { authAction } from '@/lib/server-actions/safe-actions';
import { DeleteFileSchema } from './deleteFile.schema';
import type { GetFileByIdQueryType } from './getFileById.query';
import { GetFileByIdQuery } from './getFileById.query';

export const DeleteFileAction = authAction(
  DeleteFileSchema,
  async ({ fileId }) => {
    const file: GetFileByIdQueryType = await GetFileByIdQuery(fileId);

    if (!file) return null;
    await deleteFileFromBucket({
      bucketName: env.S3_BUCKET_NAME,
      fileName: file.fileName,
    });

    await prisma.file.delete({
      where: {
        id: fileId,
      },
    });
  }
);
