import type { PresignedUrlProp } from '@/types/blobStorage.type';
import * as Minio from 'minio';
import { env } from '../env/server';
import { logger } from '../logger';

// Create a new Minio client with the S3 endpoint, access key, and secret key
export const s3Client = new Minio.Client({
  endPoint: env.S3_ENDPOINT,
  port: env.S3_PORT ? Number(env.S3_PORT) : undefined,
  accessKey: env.S3_ACCESS_KEY,
  secretKey: env.S3_SECRET_KEY,
  useSSL: env.S3_USE_SSL === 'true',
});

export const createBucketIfNotExists = async (bucketName: string) => {
  const bucketExists = await s3Client.bucketExists(bucketName);
  if (!bucketExists) {
    await s3Client.makeBucket(bucketName);
  }
};

/**
 * Uploads file to S3 directly using presigned url
 * @param presignedUrl presigned url for uploading
 * @param file  file to upload
 * @returns  response from S3
 */
export const uploadToS3 = async (
  presignedUrl: PresignedUrlProp,
  file: File
) => {
  const response = await fetch(presignedUrl.url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
      'Access-Control-Allow-Origin': '*',
    },
  });
  return response;
};

/**
 * Saves file info in DB
 * @param presignedUrls presigned urls for uploading
 * @returns
 */
export const saveFileInfoInDB = async (presignedUrls: PresignedUrlProp[]) => {
  return await fetch('/api/files/upload/saveFileInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(presignedUrls),
  });
};

/**
 * Generate presigned urls for uploading files to S3
 * @param files files to upload
 * @returns promise with array of presigned urls
 */
export const createPresignedUrlToUpload = async ({
  bucketName,
  fileName,
  expiry = 60 * 60, // 1 hour
}: {
  bucketName: string;
  fileName: string;
  expiry?: number;
}) => {
  // Create bucket if it doesn't exist
  await createBucketIfNotExists(bucketName);

  const url = await s3Client.presignedPutObject(bucketName, fileName, expiry);

  return url;
};

/**
 * Delete file from S3 bucket
 * @param bucketName name of the bucket
 * @param fileName name of the file
 * @returns true if file was deleted, false if not
 */
export const deleteFileFromBucket = async ({
  bucketName,
  fileName,
}: {
  bucketName: string;
  fileName: string;
}) => {
  try {
    await s3Client.removeObject(bucketName, fileName);
  } catch (error) {
    logger.error(error);
    return false;
  }
  return true;
};

export const createPresignedUrlToDownload = async ({
  bucketName,
  fileName,
  expiry = 60 * 60, // 1 hour
}: {
  bucketName: string;
  fileName: string;
  expiry?: number;
}) => {
  return await s3Client.presignedGetObject(bucketName, fileName, expiry);
};
