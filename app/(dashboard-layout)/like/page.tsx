import { CharacterList } from '@/components/characters/characterList';
import { PaginationComponent } from '@/components/pagination/pagination';
import { CountLikedCharactersByUserQuery } from '@/features/character/like/countLikedCharactersByUser.query';
import { GetPaginatedLikedCharactersByUserQuery } from '@/features/character/like/getPaginatedLikedCharactersByUser.query';
import { requiredAuth } from '@/lib/auth/helper';
import { searchParamsCache } from '@/lib/searchParams';
import type { PageParams } from '@/types/next';
import { LINKS } from '@/utils/NavigationLinks';
import {
  Box,
  Container,
  Divider,
  Group,
  Space,
  Stack,
  Title,
} from '@mantine/core';

const RoutePage = async ({ searchParams }: PageParams<{}>) => {
  const user = await requiredAuth();

  const { page, pageSize } = searchParamsCache.parse(searchParams);

  const characters = await GetPaginatedLikedCharactersByUserQuery({
    params: { skip: page, take: pageSize },
    userId: user.id,
  });

  const characterCount = await CountLikedCharactersByUserQuery(user.id);

  return (
    <Container size="90vw">
      <Stack>
        <Box>
          <Title>All Character you've liked</Title>
          <Divider />
        </Box>
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
      </Stack>
    </Container>
  );
};

export default RoutePage;
