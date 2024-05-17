import AvatarImage from '@/components/ui/Avatar';
import { requiredAuth } from '@/lib/auth/helper';
import { prisma } from '@/lib/prisma';
import type { PageParams } from '@/types/next';
import { displayName } from '@/utils/format/displayName';
import { Group, Paper, Stack, Title } from '@mantine/core';
import { EditPasswordForm } from './_component/EditPasswordForm';
import { EditProfilForm } from './_component/EditProfilForm';

const Page = async ({}: PageParams) => {
  const user = await requiredAuth();

  const hasPassword = await prisma.user.count({
    where: {
      id: user.id,
      passwordHash: {
        not: null,
      },
    },
  });

  return (
    <Paper
      radius="lg"
      p="xl"
      my="md"
      withBorder
      bg="var(--mantine-color-dark-5)"
    >
      <Stack>
        <Group>
          <AvatarImage user={user} />
          <Title order={3}>{displayName(user)}</Title>
        </Group>

        <EditProfilForm defaultValues={user} />
        {Boolean(hasPassword) && <EditPasswordForm />}
      </Stack>
    </Paper>
  );
};

export default Page;
