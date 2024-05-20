import type { GetPaginatedCharactersQuery } from '@/features/character/getPaginatedCharacters.query';
import { Group, Stack } from '@mantine/core';
import { Suspense } from 'react';
import { CharacterCardLoader } from '../loader/characterCard.loader';
import { Character3DCard } from './character3DCard';

export type CharacterListProps = {
  characters: GetPaginatedCharactersQuery;
};

export const CharacterList = ({ characters }: CharacterListProps) => {
  return (
    <Stack>
      <Group justify="space-evenly" align="center">
        {characters.map((character, idx) => (
          <Suspense key={idx} fallback={<CharacterCardLoader />}>
            <Character3DCard {...character} />
          </Suspense>
        ))}
      </Group>
    </Stack>
  );
};
