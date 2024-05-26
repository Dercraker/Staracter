'use client';

import { characterKeys } from '@/features/character/characterKeys.factory';
import { UserCanAddCharacterAction } from '@/features/character/dashboard/userCanAddCharacter.action';
import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { User } from '@prisma/client';
import { IconCirclePlus, IconUserPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { AddCharacterModal } from './addCharacterModal';
import { LimitCharacterModal } from './limitCharacterModal';

type AddCharacterButtonProps = {
  user: User | null;
};

export const AddCharacterButton = ({ user }: AddCharacterButtonProps) => {
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [canAddCharacter, setCanAddCharacter] = useState<boolean>(false);

  const handleOpenModal = () => {
    if (!user) return;

    openModal();
  };

  useQuery({
    queryKey: characterKeys.countByUser(user?.id || ''),
    queryFn: async () => {
      const { data } = await UserCanAddCharacterAction(null);

      setCanAddCharacter(data || false);
    },
    enabled: user?.id != null,
    staleTime: -1,
  });

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
      {canAddCharacter ? (
        <AddCharacterModal
          isOpen={isModalOpen}
          close={closeModal}
          user={user!}
        />
      ) : (
        <LimitCharacterModal
          isOpen={isModalOpen}
          close={closeModal}
          user={user!}
        />
      )}
    </>
  );
};
