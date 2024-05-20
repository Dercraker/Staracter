'use client';

import { DeleteCharacterByIdAction } from '@/features/character/deleteCharacterById.action';
import useNotify from '@/hook/useNotify';
import { logger } from '@/lib/logger';
import {
  ActionIcon,
  Box,
  Button,
  ButtonGroup,
  Group,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalRoot,
  ModalTitle,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash, IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export type DeleteButtonProps = {
  characterId: string;
};

export const DeleteButton = ({ characterId }: DeleteButtonProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { ErrorNotify, SuccessNotify } = useNotify();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (characterId: string) =>
      await DeleteCharacterByIdAction(characterId),

    onError(error) {
      logger.error(error);
      ErrorNotify({ title: error.message });
    },

    onSuccess({ serverError }) {
      if (serverError) {
        logger.error(serverError);
        return ErrorNotify({ title: serverError });
      }

      SuccessNotify({ title: 'Character deleted' });
      router.refresh();
    },

    onSettled() {
      close();
    },
  });

  const handleDeleteCharacter = async () => {
    await mutateAsync(characterId);
  };

  return (
    <>
      <Group onClick={open} className="cursor-pointer">
        <ActionIcon variant="transparent">
          <IconTrash color="var(--mantine-color-red-9)" />
        </ActionIcon>
      </Group>
      <ModalRoot opened={opened} onClose={close} centered>
        <ModalOverlay backgroundOpacity={0.55} blur={3} />
        <ModalContent>
          <ModalHeader>
            <ModalTitle fw={700}>Character Delete Confirmation</ModalTitle>
            <ModalCloseButton icon={<IconX />} />
          </ModalHeader>
          <ModalBody>
            <Stack>
              <Box>
                <Text>Are you sure you want to delete your character?</Text>
                <Text c="dimmed" fs="italic" size="xs">
                  This action is definitive and you will no longer be able to
                  access it.
                </Text>
              </Box>
              <ButtonGroup className="flex flex-row justify-center">
                <Button
                  variant="light"
                  color="var(--mantine-color-teal-5)"
                  onClick={handleDeleteCharacter}
                  loading={isPending}
                >
                  Confirmer
                </Button>
                <Button
                  variant="outline"
                  color="var(--mantine-color-red-7)"
                  onClick={close}
                >
                  Annuler
                </Button>
              </ButtonGroup>
            </Stack>
          </ModalBody>
        </ModalContent>
      </ModalRoot>
    </>
  );
};
