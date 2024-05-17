/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

import {
  Alert,
  Container,
  Divider,
  Group,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import MagicLinkForm from './MagicLinkForm';
import ProviderButton from './ProviderButton';
import { SignInCredentialsAndMagicLinkForm } from './SignInCredentialsAndMagicLinkForm';

export const SignInProviders = () => {
  const { data: providers, isPending } = useQuery({
    queryFn: () => fetch(`/api/auth/providers`).then((res) => res.json()),
    queryKey: ['providers'],
  });

  if (isPending) {
    return (
      <Stack px="md">
        <Skeleton height={40} radius="xl" />
        <Skeleton height={40} radius="xl" />
        <Divider label="Or" labelPosition="center" my="lg" />
        <Skeleton height={40} radius="xl" />
        <Skeleton height={40} radius="xl" />
      </Stack>
    );
  }

  if (typeof providers !== 'object') {
    return (
      <Alert icon={<IconAlertTriangle />} color="var(--mantine-color-red-6)">
        <Title>
          The provider is not available. It's due to a misconfiguration in the
          auth.ts file
        </Title>
      </Alert>
    );
  }
  return (
    <Container>
      {providers.resend && !providers.credentials ? (
        <>
          <MagicLinkForm />
          <Divider label="Or" labelPosition="center" my="lg" />
        </>
      ) : null}
      {providers.credentials ? (
        <>
          <SignInCredentialsAndMagicLinkForm />
          <Divider label="Or" labelPosition="center" my="lg" />
        </>
      ) : null}
      <div className="flex flex-col gap-2">
        {/* ℹ️ Add provider you want to support here */}
        {providers.discord ? <ProviderButton providerId="discord" /> : null}
        {providers.github ? <ProviderButton providerId="github" /> : null}
      </div>
      {providers.credentials ? (
        <Group>
          <Text>
            {"You don't have an account ? "}
            <Text
              component={Link}
              href="/auth/signup"
              fs="italic"
              td="underline"
              c="blue"
              style={{ cursor: 'pointer' }}
            >
              Sign up
            </Text>
          </Text>
        </Group>
      ) : null}
    </Container>
  );
};
