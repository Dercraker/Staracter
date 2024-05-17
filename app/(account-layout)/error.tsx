'use client';

import SignInButton from '@/components/auth/SignInButton';
import { logger } from '@/lib/logger';
import type { ErrorParams } from '@/types/next';
import { Alert } from '@mantine/core';
import { Container } from '@react-email/components';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useEffect } from 'react';

const RouteError = ({ error }: ErrorParams) => {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  return (
    <Container>
      <Alert
        variant="light"
        color="var(--mantine-color-red-6)"
        icon={<IconAlertTriangle />}
        title="You need to be authenticated to access this resource."
      >
        <SignInButton fullWidth variant="filled" />
      </Alert>
    </Container>
  );
};

export default RouteError;
