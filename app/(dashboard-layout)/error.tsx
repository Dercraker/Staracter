'use client';

import { ContactSupportDialog } from '@/components/contact/support/ContactSupportDialog';
import { logger } from '@/lib/logger';
import type { ErrorParams } from '@/types/next';
import { Container, Paper, Stack, Title } from '@mantine/core';
import { Button } from '@react-email/components';
import { useEffect } from 'react';

const RouteError = ({ error, reset }: ErrorParams) => {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  return (
    <Container>
      <Stack>
        <Paper p="xl" shadow="xs" withBorder>
          <Stack>
            <Title>Sorry, something went wrong. Please try again later.</Title>
            <Button onClick={reset}>Try Again</Button>
            <ContactSupportDialog />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default RouteError;
