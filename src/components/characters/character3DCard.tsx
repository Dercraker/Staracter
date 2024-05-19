import type { GetPaginatedCharacter } from '@/features/character/getPaginatedCharacters.query';
import { auth } from '@/lib/auth/helper';
import { displayName } from '@/utils/format/displayName';
import {
  ActionIcon,
  AspectRatio,
  Group,
  Image,
  Stack,
  Text,
} from '@mantine/core';
import { IconHearts, IconUserQuestion } from '@tabler/icons-react';
import moment from 'moment';
import nextImage from 'next/image';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import { DeleteButton } from './deleteButton';
import { DisplayCharacterName } from './displayCharacterName';
import { DownloadButton } from './downloadButton';

export type Character3DCardProps = GetPaginatedCharacter;

export const Character3DCard = async ({
  Tag,
  _count,
  downloadCount,
  fileId,
  files,
  id: characterId,
  name,
  pictureId,
  publishDate,
  user,
}: Character3DCardProps) => {
  const authUser = await auth();

  const characterFile = files.find((file) => file.id === fileId);
  const pictureFile = files.find((file) => file.id === pictureId);

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-zinc-800 dark:border-white/[0.2] border-black/[0.1] w-80 h-96 rounded-xl">
        <CardItem translateZ="100" className="w-full">
          <AspectRatio ratio={16 / 9}>
            <Image
              component={nextImage}
              alt={name}
              src={pictureFile?.url}
              height={260}
              width={318}
              fit="cover"
              radius="md"
            />
          </AspectRatio>
        </CardItem>
        <Stack justify="space-between" className="px-4">
          <Stack justify="space-between" h="100%">
            <Group justify="end" align="center" wrap="nowrap">
              <Stack gap={0} w="100%" ta="end">
                <DisplayCharacterName name={name} />
                <Text c="dimmed" fs="italic">
                  {moment(publishDate).format('YYYY/MM/DD')}
                </Text>
              </Stack>
            </Group>

            <Group gap="xs" align="flex-end" justify="space-between">
              <Group c="var(--mantine-color-blue-text)">
                <DownloadButton
                  downloadCount={downloadCount}
                  id={characterId}
                  url={characterFile?.url as string}
                />
                <Group align="center" justify="center" gap={0}>
                  <ActionIcon variant="subtle" disabled>
                    <IconHearts color="var(--mantine-color-pink-5)" />{' '}
                  </ActionIcon>
                  {String(_count.likes)}
                </Group>
                {!!authUser && authUser.id === user?.id && (
                  <DeleteButton characterId={characterId} />
                )}
              </Group>
              {user ? (
                <Text fz="sm" c="dimmed">
                  By : {displayName(user)}
                </Text>
              ) : (
                <Group gap={0}>
                  <IconUserQuestion color="var(--mantine-color-dimmed)" />
                  <Text fz="sm" c="dimmed">
                    Unknown user
                  </Text>
                </Group>
              )}
            </Group>
          </Stack>
        </Stack>
      </CardBody>
    </CardContainer>
  );
};
