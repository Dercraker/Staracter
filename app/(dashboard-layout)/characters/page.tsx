import { CharacterList } from '@/components/characters/characterList';
import { PaginationComponent } from '@/components/pagination/pagination';
import { GetCharacterCountByUserQuery } from '@/features/character/dashboard/getCharacterCountByUser.query';
import { GetPaginatedCharactersByUserQuery } from '@/features/character/dashboard/getPagintedCharacterByUser.query';
import { requiredAuth } from '@/lib/auth/helper';
import { searchParamsCache } from '@/lib/searchParams';
import type { PageParams } from '@/types/next';
import { LINKS } from '@/utils/NavigationLinks';
import { Container, Group, Space } from '@mantine/core';

const RoutePage = async ({ searchParams }: PageParams<{}>) => {
  const user = await requiredAuth();

  const { page, pageSize } = searchParamsCache.parse(searchParams);

  const characters = await GetPaginatedCharactersByUserQuery({
    params: {
      skip: page,
      take: pageSize,
    },
    userId: user.id,
  });

  const characterCount = await GetCharacterCountByUserQuery(user.id);

  return (
    <Container size="90vw">
      <CharacterList characters={characters} />
      {characterCount > pageSize && (
        <>
          <Space h="xl" />
          <Group align="center" justify="center">
            <PaginationComponent
              baseUri={LINKS.Dashboard.Characters.href}
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
