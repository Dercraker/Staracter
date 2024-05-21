import { Group, Skeleton, Stack, Text } from '@mantine/core';
import { IconDownload, IconHearts, IconTrash } from '@tabler/icons-react';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';

export const CharacterCardLoader = () => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-indigo-600/30 dark:bg-zinc-800 dark:border-white/[0.2] border-black/[0.1] w-80 h-96 rounded-xl">
        <CardItem translateZ="100" className="w-full">
          <Skeleton height={260} width="100%" />
        </CardItem>
        <Stack justify="space-between" className="px-4">
          <Group justify="end" align="center" wrap="nowrap">
            <Stack gap={5} w="100%" align="end" pt={4}>
              <Skeleton height={38} width="75%" />
              <Skeleton height={22} width={100} />
            </Stack>
          </Group>

          <Group gap="xs" align="flex-end" justify="space-between">
            <Group c="var(--mantine-color-blue-text)">
              <Group gap={5}>
                <IconDownload
                  color="var(--mantine-color-teal-7)"
                  className="cursor-not-allowed"
                />
                <Skeleton height={22} width={22} />
              </Group>
              <Group gap={5}>
                <IconHearts
                  color="var(--mantine-color-pink-5)"
                  className="cursor-not-allowed"
                />
                <Skeleton height={22} width={22} />
              </Group>
              <IconTrash
                color="var(--mantine-color-red-9)"
                className="cursor-not-allowed"
              />
            </Group>
            <Group justify="center" align="center" gap={4}>
              <Text fz="sm" c="dimmed">
                By :
              </Text>
              <Skeleton height={16} width={80} />
            </Group>
          </Group>
        </Stack>
      </CardBody>
    </CardContainer>
  );
};
