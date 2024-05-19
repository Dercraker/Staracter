import { prisma } from '@/lib/prisma';
import { searchParamsCache } from '@/lib/searchParams';
import type { PageParams } from '@/types/next';
import { LINKS } from '@/utils/NavigationLinks';
import {
  Alert,
  Badge,
  Button,
  Center,
  Group,
  Paper,
  Title,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const RoutePage = async ({ searchParams }: PageParams) => {
  const { success, token } = searchParamsCache.parse(searchParams);

  if (success) {
    return (
      <Paper radius="lg" p="xl" withBorder my="md">
        <Title order={2}>Email verified</Title>
        <Button component={Link} href={LINKS.Account.Profile.href}>
          Account
        </Button>
      </Paper>
    );
  }

  if (!token) {
    return (
      <Center>
        <Alert
          color="var(--mantine-color-red-9)"
          title={
            <Group>
              <Badge color="red">Error</Badge> Invalid Token
            </Group>
          }
          icon={<IconAlertTriangle />}
          className="max-w-xs"
        >
          <Button component={Link} href={LINKS.Account.Profile.href} fullWidth>
            Go to account
          </Button>
        </Alert>
      </Center>
    );
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      token,
    },
  });

  const email = verificationToken?.identifier;

  if (!email) {
    return (
      <Center>
        <Alert
          color="var(--mantine-color-red-9)"
          title={
            <Group>
              <Badge color="red">Error</Badge> Invalid Token
            </Group>
          }
          icon={<IconAlertTriangle />}
          className="max-w-xs"
        >
          <Button component={Link} href={LINKS.Account.Profile.href} fullWidth>
            Go to account
          </Button>
        </Alert>
      </Center>
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return (
      <Center>
        <Alert
          color="var(--mantine-color-red-9)"
          title={
            <Group>
              <Badge color="red">Error</Badge> User Not Found
            </Group>
          }
          icon={<IconAlertTriangle />}
          className="max-w-xs"
        >
          <Button component={Link} href={LINKS.Account.Profile.href} fullWidth>
            Go to account
          </Button>
        </Alert>
      </Center>
    );
  }

  if (user.emailVerified) {
    return (
      <Paper radius="lg" p="xl" withBorder my="md">
        <Title order={2}>Email Verified.</Title>
        <Button component={Link} href={LINKS.Account.Profile.href} fullWidth>
          Account
        </Button>
      </Paper>
    );
  }

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  await prisma.verificationToken.delete({
    where: {
      token,
    },
  });

  redirect('/account/verify-email?success=true');
};

export default RoutePage;
