'use client';

import { logger } from '@/lib/logger';
import type { ErrorParams } from '@/types/next';
import { Button, Container, Group, Paper, Stack, Title } from '@mantine/core';
import { useEffect } from 'react';

const RoutePage = ({ error, reset }: ErrorParams) => {
  useEffect(() => {
    // Log the error to an error reporting service
    logger.error(error);
  }, [error]);

  return (
    <Container>
      <Stack>
        <Paper p="xl" shadow="xl" withBorder>
          <Stack>
            <Title order={1}>
              Sorry, something went wrong. Please try again later.
            </Title>
            <Group align="center" justify="end">
              <Button onClick={reset} variant="outline">
                Try again
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default RoutePage;
