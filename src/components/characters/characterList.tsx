import type { GetPaginatedCharactersQuery } from '@/features/character/getPaginatedCharacters.query';
import { Group, Stack } from '@mantine/core';
import { Character3DCard } from './character3DCard';

export type CharacterListProps = {
  characters: GetPaginatedCharactersQuery;
};

export const CharacterList = ({ characters }: CharacterListProps) => {
  return (
    <Stack>
      <Group justify="space-evenly" align="center">
        {characters.map((character, idx) => (
          <>
            {/* <CharacterCard key={idx} {...character}>
              <CharacterCardSection {...character} />
            </CharacterCard> */}
            <Character3DCard key={`3d-${idx}`} {...character} />
          </>
        ))}
      </Group>
    </Stack>
  );
};
