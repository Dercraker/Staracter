import { GetCharacterCountByUserIdQuery } from '@/features/character/dashboard/getCharacterCountByUserId.query';
import { GetTotalCharacterDownloadByUserIdQuery } from '@/features/character/dashboard/getTotalCharacterDownloadByUser.query';
import { GetCharacterLikeCountByUserIdQuery } from '@/features/character/dashboard/getTotalCharacterLikeByUser.query';
import { requiredAuth } from '@/lib/auth/helper';
import {
  Container,
  Divider,
  Group,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Suspense } from 'react';

const RoutePage = async () => {
  const user = await requiredAuth();
  const characterCount = await GetCharacterCountByUserIdQuery(user.id);
  const downloadCount = await GetTotalCharacterDownloadByUserIdQuery(user.id);
  const likeCount = await GetCharacterLikeCountByUserIdQuery(user.id);

  return (
    <Container>
      <Stack>
        <Title>Dashboard</Title>
        <Divider mb="md" />
        <Group>
          <Paper p="xl" shadow="xl" withBorder w={{ base: '90vw', xs: 'auto' }}>
            <Title order={3}>Character Created</Title>
            <Suspense
              fallback={
                <Skeleton width="100%" height="var(--mantine-font-size-md)" />
              }
            >
              <Text>{characterCount}</Text>
            </Suspense>
          </Paper>
          <Paper p="xl" shadow="xl" withBorder w={{ base: '90vw', xs: 'auto' }}>
            <Title order={3}>Total Download</Title>
            <Suspense
              fallback={
                <Skeleton width="100%" height="var(--mantine-font-size-md)" />
              }
            >
              <Text>{downloadCount}</Text>
            </Suspense>
          </Paper>
          <Paper p="xl" shadow="xl" withBorder w={{ base: '90vw', xs: 'auto' }}>
            <Title order={3}>Total Like</Title>
            <Suspense
              fallback={
                <Skeleton width="100%" height="var(--mantine-font-size-md)" />
              }
            >
              <Text>{likeCount}</Text>
            </Suspense>
          </Paper>
        </Group>
      </Stack>
    </Container>
  );
};

export default RoutePage;
