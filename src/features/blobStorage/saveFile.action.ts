'use server';

import { env } from '@/lib/env/server';
import {
  createPresignedUrlToUpload,
  uploadToS3,
} from '@/lib/objectStorage/minio';
import { prisma } from '@/lib/prisma';
import { ActionError, authAction } from '@/lib/server-actions/safe-actions';
import type {
  BlobInfo,
  PresignedUrlProp,
  ShortFileProp,
} from '@/types/blobStorage.type';
import { getMinioUrl } from '@/utils/server-url';
import { AddCharacterFileSchema } from './AddCharacterFile.schema';

export const saveFileAction = authAction(
  AddCharacterFileSchema,
  async (input) => {
    let file = input.get('file') as File;
    const folderName = input.get('folderName') as string;

    if (file.type === 'application/octet-stream' && file.name.endsWith('.chf'))
      file = new File([file], file.name, { type: 'application/chf' });

    const extension = file.type.split('/')[1];
    const fileName = `${
      folderName ? `${folderName}/` : ''
    }${crypto.randomUUID()}.${extension}`;

    const url = await createPresignedUrlToUpload({
      bucketName: env.S3_BUCKET_NAME,
      fileName,
    });

    // validate files
    const filesInfo: ShortFileProp = {
      originalFileName: file.name,
      fileSize: file.size,
    };

    const presignedUrl: PresignedUrlProp = {
      ...filesInfo,
      url,
      fileNameInBucket: fileName,
    };

    const res = await uploadToS3(presignedUrl, file);

    if (res.status !== 200) throw new ActionError('Upload failed');

    const blob = await prisma.file.create({
      data: {
        bucket: env.S3_BUCKET_NAME,
        fileName,
        originalName: file.name,
        size: file.size,
        url: `${getMinioUrl()}${fileName}`,
        etag: res.headers.get('etag') as string,
        createAt: new Date(),
      },
    });

    return {
      fileName: blob.originalName,
      url: `${getMinioUrl()}${blob.fileName}`,
      id: blob.id,
    } as BlobInfo;
  }
);
