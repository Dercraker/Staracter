'use client';

import { IncrementDownloadCountAction } from '@/features/character/incrementDownloadCount.action';
import { ActionIcon, Group } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export type DownloadButtonProps = {
  downloadCount: number;
  url: string;
  id: string;
};

export const DownloadButton = ({
  downloadCount,
  id,
  url,
}: DownloadButtonProps) => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: async () =>
      await IncrementDownloadCountAction({
        characterId: id,
        currentCount: downloadCount,
      }),
  });

  const handleDownload = async () => {
    window.open(url, '_blank');
    await mutateAsync();
    router.refresh();
  };

  return (
    <Group align="center" justify="center" gap={0} onClick={handleDownload}>
      <ActionIcon variant="subtle">
        <IconDownload color="var(--mantine-color-teal-7)" />
      </ActionIcon>
      {String(downloadCount)}
    </Group>
  );
};
