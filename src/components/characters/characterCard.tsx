'use client';

import type { GetPaginatedCharacter } from '@/features/character/getPaginatedCharacters.query';
import { Card } from '@mantine/core';
import type { PropsWithChildren } from 'react';

export type CharacterCardProps = PropsWithChildren<GetPaginatedCharacter>;

export const CharacterCard = ({ children }: CharacterCardProps) => {
  return (
    <Card
      shadow="sm"
      w="20em"
      h="24em"
      withBorder
      padding="lg"
      className="select-none"
    >
      {children}
    </Card>
  );
};
