import { prisma } from '@/lib/prisma';
import { searchParamsCache } from '@/lib/searchParams';
import type { PageParams } from '@/types/next';
import { Badge, Button, Paper, Title } from '@mantine/core';
import { redirect } from 'next/navigation';

const RoutePage = async ({ searchParams }: PageParams) => {
  const { success, token } = searchParamsCache.parse(searchParams);

  if (success) {
    return (
      <Paper radius="lg" p="xl" withBorder my="md">
        <Title order={2}>Email verified</Title>
        <Button component="a" href="/account">
          Account
        </Button>
      </Paper>
    );
  }

  if (!token) {
    return (
      <Paper radius="lg" p="xl" withBorder my="md">
        <Badge color="red">Error</Badge>
        <Title order={2}>Invalid Token</Title>
        <Button component="a" href="/account">
          Account
        </Button>
      </Paper>
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
      <Paper radius="lg" p="xl" withBorder my="md">
        <Badge color="red">Error</Badge>
        <Title order={2}>Invalid Token</Title>
        <Button component="a" href="/account">
          Account
        </Button>
      </Paper>
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return (
      <Paper radius="lg" p="xl" withBorder my="md">
        <Badge color="red">Error</Badge>
        <Title order={2}>User Not Found</Title>
        <Button component="a" href="/account">
          Account
        </Button>
      </Paper>
    );
  }

  if (user.emailVerified) {
    return (
      <Paper radius="lg" p="xl" withBorder my="md">
        <Title order={2}>Email Verified.</Title>
        <Button component="a" href="/account">
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
