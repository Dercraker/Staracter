import { CharacterCard } from '@/components/characters/characterCard';
import { CharacterCardSection } from '@/components/characters/characterCardSection';
import type { GetPaginatedCharactersQuery } from '@/features/character/getPaginatedCharacters.query';
import { Group, Stack } from '@mantine/core';

export type CharacterListProps = {
  characters: GetPaginatedCharactersQuery;
};

export const CharacterList = ({ characters }: CharacterListProps) => {
  return (
    <Stack>
      <Group justify="space-evenly" align="center">
        {characters.map((character, idx) => (
          <CharacterCard key={idx} {...character}>
            <CharacterCardSection {...character} />
          </CharacterCard>
        ))}
      </Group>
    </Stack>
  );
};
