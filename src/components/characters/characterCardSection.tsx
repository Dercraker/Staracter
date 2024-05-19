import { DeleteButton } from '@/components/characters/deleteButton';
import { DownloadButton } from '@/components/characters/downloadButton';
import type { GetPaginatedCharacter } from '@/features/character/getPaginatedCharacters.query';
import { auth } from '@/lib/auth/helper';
import { displayName } from '@/utils/format/displayName';
import {
  ActionIcon,
  AspectRatio,
  CardSection,
  Group,
  Image,
  Stack,
  Text,
} from '@mantine/core';
import { IconHearts, IconUserQuestion } from '@tabler/icons-react';
import moment from 'moment';
import nextImage from 'next/image';
import { DisplayCharacterName } from './displayCharacterName';

export type CharacterCardSectionProps = GetPaginatedCharacter;

export const CharacterCardSection = async ({
  name,
  publishDate,
  user,
  pictureId,
  fileId,
  id: characterId,
  files,
  _count,
  downloadCount,
}: CharacterCardSectionProps) => {
  const authUser = await auth();

  const characterFile = files.find((file) => file.id === fileId);
  const pictureFile = files.find((file) => file.id === pictureId);

  return (
    <>
      <CardSection h={260}>
        <AspectRatio ratio={3 / 4}>
          <Image
            component={nextImage}
            alt={name}
            src={pictureFile?.url}
            height={260}
            width={318}
            fit="cover"
          />
        </AspectRatio>
      </CardSection>
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
    </>
  );
};
