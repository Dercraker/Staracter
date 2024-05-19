import { DeleteFileAction } from '@/features/blobStorage/deleteFile.action';
import { saveFileAction } from '@/features/blobStorage/saveFile.action';
import type { NotifyDto } from '@/hook/useNotify';
import useNotify from '@/hook/useNotify';
import { logger } from '@/lib/logger';
import type { BlobInfo } from '@/types/blobStorage.type';
import {
  AspectRatio,
  Center,
  Group,
  Image,
  Loader,
  Overlay,
  Stack,
  Text,
  rem,
} from '@mantine/core';
import type { DropzoneProps } from '@mantine/dropzone';
import { Dropzone } from '@mantine/dropzone';
import {
  IconPhotoScan,
  IconTrashX,
  IconUpload,
  IconX,
} from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import nextImage from 'next/image';
import { useState } from 'react';
import { useHover } from 'react-use';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface AddCharacterDropFileProps extends Partial<DropzoneProps> {
  withPreview?: boolean;
  location: string;
  successSaveFile: (data: BlobInfo) => void;
}

export const AddCharacterDropFile = ({
  location,
  successSaveFile,
  withPreview,
  ...props
}: AddCharacterDropFileProps) => {
  const { ErrorNotify, NotifyMultipleErrors } = useNotify();
  const [currentFile, setCurrentFile] = useState<BlobInfo | null>(null);

  const saveFileMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folderName', location);

      const { data, serverError, validationErrors } =
        await saveFileAction(formData);

      if (serverError) return serverError;
      if (validationErrors) return validationErrors;

      return data;
    },
    onError(error) {
      ErrorNotify({
        title: 'Error',
        message: error.message,
      });
    },

    onSuccess(data) {
      const { url, fileName, id } = data as BlobInfo;

      setCurrentFile({ url, fileName, id });

      successSaveFile(data as BlobInfo);
    },
  });

  const deleteFileMutation = useMutation({
    mutationFn: async () => {
      await DeleteFileAction({ fileId: currentFile?.id as string });
    },
    onError(error) {
      logger.error(error);
    },

    onSuccess() {
      setCurrentFile(null);
    },
  });

  const handleDeleteCharacterPicture = async () => {
    await deleteFileMutation.mutateAsync();
  };
  const handleDeleteCharacterFile = async () => {
    await deleteFileMutation.mutateAsync();
  };

  const previewImage = (hovered: boolean) => (
    <AspectRatio maw={100} pos="relative" className="size-full">
      <Image
        component={nextImage}
        src={currentFile?.url as string}
        alt="Preview"
        height={100}
        width={100}
        fit="cover"
        loading="lazy"
      />
      {(hovered || deleteFileMutation.isPending) && (
        <Overlay
          color="#fff"
          backgroundOpacity={0.35}
          blur={3}
          onClick={handleDeleteCharacterPicture}
          className={
            deleteFileMutation.isPending
              ? 'cursor-not-allowed'
              : 'cursor-pointer'
          }
        >
          <Center className="size-full">
            {deleteFileMutation.isPending ? (
              <Loader />
            ) : (
              <IconTrashX color="#ff8787" size={48} stroke={2} />
            )}
          </Center>
        </Overlay>
      )}
    </AspectRatio>
  );
  const [hoverable, hovered] = useHover(previewImage);

  return (
    <>
      <Dropzone
        loading={saveFileMutation.isPending || deleteFileMutation.isPending}
        onDrop={(files) => {
          saveFileMutation.mutate(files[0]);
        }}
        onReject={(filesRejection) => {
          return NotifyMultipleErrors(
            filesRejection[0].errors.map((error) => {
              return { message: error.message } as NotifyDto;
            })
          );
        }}
        maxFiles={1}
        hidden={!!currentFile}
        maxSize={4 * 1024 ** 2}
        h="100"
        {...props}
      >
        <Group style={{ pointerEvents: 'none' }} justify="center">
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-blue-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-red-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhotoScan
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-dimmed)',
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>
          <Stack gap="1">
            <Text inline fw="500" ta="center" c="dimmed">
              Drag image here
            </Text>
            <Text inline fw="700" tt="uppercase" ta="center" c="dimmed">
              or
            </Text>
            <Text inline fw="500" ta="center" c="dimmed">
              Click to select file
            </Text>
          </Stack>
        </Group>
      </Dropzone>

      {currentFile && (
        <>
          {withPreview ? (
            <>
              <div>
                <Group justify="center">{hoverable}</Group>
              </div>
            </>
          ) : (
            <Group
              gap="2"
              className={
                deleteFileMutation.isPending
                  ? 'cursor-not-allowed'
                  : 'cursor-default'
              }
            >
              <Text fs="italic" td="underline" c="blue" truncate>
                {currentFile.fileName}
              </Text>
              {deleteFileMutation.isPending ? (
                <Loader size={18} />
              ) : (
                <IconTrashX
                  color="var(--mantine-color-red-4)"
                  className={'cursor-pointer'}
                  onClick={handleDeleteCharacterFile}
                />
              )}
            </Group>
          )}
        </>
      )}
    </>
  );
};
