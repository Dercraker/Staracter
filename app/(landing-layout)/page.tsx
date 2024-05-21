import { AddCharacterButton } from '@/components/characters/addCharacter/addCharacterButton';
import { CharacterList } from '@/components/characters/characterList';
import { PaginationComponent } from '@/components/pagination/pagination';
import { GetCharacterCountQuery } from '@/features/character/getCharacterCount.query';
import { GetPaginatedCharactersQuery } from '@/features/character/getPaginatedCharacters.query';
import { auth } from '@/lib/auth/helper';
import { searchParamsCache } from '@/lib/searchParams';
import type { PageParams } from '@/types/next';
import { LINKS } from '@/utils/NavigationLinks';
import { Affix, Container, Group, Space, Stack } from '@mantine/core';
import { SearchBar } from './_component/searchBar';

const RoutePage = async ({ searchParams }: PageParams) => {
  const user = await auth();
  const { page, pageSize, search } = searchParamsCache.parse(searchParams);

  const characters = await GetPaginatedCharactersQuery({
    params: {
      skip: page,
      take: pageSize,
    },
    search,
  });

  const characterCount = await GetCharacterCountQuery({ search });

  return (
    <Container size="90vw">
      <Space h="xl" />
      <Stack>
        <SearchBar allTags={[]} />

        <CharacterList characters={characters} />
      </Stack>
      <Affix position={{ bottom: 20, right: 20 }}>
        <AddCharacterButton user={user} />
      </Affix>
      {characterCount > pageSize && (
        <>
          <Space h="xl" />
          <Group align="center" justify="center">
            <PaginationComponent
              baseUri={LINKS.Landing.Landing.href}
              queryKey={'page'}
              total={Math.ceil(characterCount / pageSize)}
            />
          </Group>
        </>
      )}
    </Container>
  );
};

export default RoutePage;
