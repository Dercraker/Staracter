import type { PageParams } from '@/types/next';
import { LINKS } from '@/utils/NavigationLinks';
import { Button, Container, Paper, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const RoutePage = ({ searchParams }: PageParams) => {
  const callbackUrl =
    typeof searchParams.callbackUrl === 'string'
      ? searchParams.callbackUrl
      : LINKS.Landing.Landing.href;

  redirect(callbackUrl);

  return (
    <Container>
      <Stack>
        <Paper p="xl" shadow="xl" withBorder>
          <Stack>
            <Stack gap="xs" align="center" justify="center">
              <Title>Successfully login</Title>
              <Text c="dimmed">You can now use the app</Text>
              <Button component={Link} href={LINKS.Landing.Landing.href}>
                Get Started
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default RoutePage;
