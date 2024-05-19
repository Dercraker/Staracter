'use client';

import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { User } from '@prisma/client';
import { IconCirclePlus, IconUserPlus } from '@tabler/icons-react';
import { AddCharacterModal } from './addCharacterModal';

type AddCharacterButtonProps = {
  user: User | null;
};

export const AddCharacterButton = ({ user }: AddCharacterButtonProps) => {
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const handleOpenModal = () => {
    if (!user) return;

    openModal();
  };

  return (
    <>
      <Tooltip
        label="You must be logged in to add a character"
        transitionProps={{ transition: 'fade-up', duration: 200 }}
        disabled={!!user}
        visibleFrom="xs"
      >
        <Button
          leftSection={<IconUserPlus />}
          disabled={!user}
          visibleFrom="xs"
          onClick={() => handleOpenModal()}
        >
          Add Character
        </Button>
      </Tooltip>
      <ActionIcon
        disabled={!user}
        hiddenFrom="xs"
        radius="xl"
        onClick={() => handleOpenModal()}
      >
        <IconCirclePlus />
      </ActionIcon>
      <AddCharacterModal isOpen={isModalOpen} close={closeModal} user={user!} />
    </>
  );
};
