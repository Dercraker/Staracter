'use client';

import { Center, Container, Stack, Title } from '@mantine/core';

const RoutePage = () => {
  return (
    <Container>
      <Stack justify="center" align="center" h="80vh">
        <Center>
          <Title className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            COMING SOON
          </Title>
        </Center>
      </Stack>
    </Container>
  );
};

export default RoutePage;
