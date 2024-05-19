'use client';

import { DeleteFileAction } from '@/features/blobStorage/deleteFile.action';
import { addCharacterAction } from '@/features/character/addCharacter.action';
import { AddCharacterFormSchema } from '@/features/character/addCharacterForm.schema';
import type { NotifyDto } from '@/hook/useNotify';
import useNotify from '@/hook/useNotify';
import type { BlobInfo } from '@/types/blobStorage.type';
import { Button, Group, Modal, Stack, Text, TextInput } from '@mantine/core';
import { MIME_TYPES } from '@mantine/dropzone';
import { useForm, zodResolver } from '@mantine/form';
import type { User } from '@prisma/client';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AddCharacterDropFile } from './addCharacterDropFile';

export type AddCharacterModalProps = {
  isOpen: boolean;
  user: User;
  close: () => void;
};

export const AddCharacterModal = (props: AddCharacterModalProps) => {
  const queryClient = useQueryClient();
  const { SuccessNotify, ErrorNotify } = useNotify();
  const router = useRouter();

  const handleCloseModal = async () => {
    await handleDeleteFiles();
    addCharacterForm.reset();
    props.close();
  };

  const addCharacterForm = useForm<AddCharacterFormSchema>({
    validateInputOnChange: true,
    initialValues: {
      name: '',
      pictureId: '',
      fileId: '',
    },
    validate: zodResolver(AddCharacterFormSchema),
  });

  const addCharacterMutation = useMutation({
    mutationFn: async (input: AddCharacterFormSchema) =>
      await addCharacterAction(input),
    onError: () =>
      ErrorNotify({
        title: 'Error',
        message: 'Failed to add character',
      } as NotifyDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Characters'] });
      queryClient.invalidateQueries({ queryKey: ['Characters', 'Last', '10'] });
      queryClient.invalidateQueries({ queryKey: ['User', props.user.id] });
      SuccessNotify({
        title: 'Success',
        message: 'Character added successfully',
      } as NotifyDto);
      addCharacterForm.reset();
      props.close();
      router.refresh();
    },
  });

  const deleteFileMutation = useMutation({
    mutationFn: async (fileId: string) => {
      await DeleteFileAction({ fileId });
    },
  });

  const handleDeleteFiles = async () => {
    if (addCharacterForm.values.fileId)
      await deleteFileMutation.mutateAsync(addCharacterForm.values.fileId);

    if (addCharacterForm.values.pictureId)
      await deleteFileMutation.mutateAsync(addCharacterForm.values.pictureId);
  };

  return (
    <Modal.Root opened={props.isOpen} onClose={handleCloseModal} centered>
      <Modal.Overlay backgroundOpacity={0.55} blur={3} />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Add Character</Modal.Title>
          <Modal.CloseButton icon={<IconX />} />
        </Modal.Header>
        <Modal.Body>
          <form onReset={() => addCharacterForm.reset()}>
            <Stack>
              <TextInput
                label="Name"
                placeholder="Enter character name"
                {...addCharacterForm.getInputProps('name')}
              />

              <Stack gap="xs">
                <Text size="sm" td="underline">
                  Picture of character
                </Text>
                <AddCharacterDropFile
                  accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
                  withPreview
                  location="charactersPictures"
                  successSaveFile={(data: BlobInfo) => {
                    addCharacterForm.setFieldValue(
                      'pictureId',
                      data.id as string
                    );
                  }}
                />
              </Stack>
              <Stack gap="xs">
                <Text size="sm" td="underline">
                  Character File
                </Text>
                <AddCharacterDropFile
                  accept={['.chf']}
                  maxSize={10 * 1024 ** 2} // 10mb
                  location="charactersFiles"
                  successSaveFile={(data: BlobInfo) => {
                    addCharacterForm.setFieldValue('fileId', data.id as string);
                  }}
                />
              </Stack>

              <Group justify="flex-end">
                <Button
                  onClick={handleCloseModal}
                  disabled={addCharacterMutation.isPending}
                  variant="outline"
                  color="red"
                  leftSection={<IconX />}
                >
                  Annuler
                </Button>
                <Button
                  leftSection={<IconDeviceFloppy />}
                  disabled={
                    addCharacterMutation.isPending ||
                    !addCharacterForm.isValid()
                  }
                  onClick={async () =>
                    await addCharacterMutation.mutateAsync(
                      addCharacterForm.values
                    )
                  }
                >
                  Sauvegarder
                </Button>
              </Group>
            </Stack>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
