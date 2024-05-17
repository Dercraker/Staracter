import { SiteName } from '@/components/layout/SiteName';
import { AppShellHeader, Group } from '@mantine/core';

export const AuthHeader = () => {
  return (
    <AppShellHeader>
      <Group h="100%" justify="space-between" px="md">
        <Group>
          <SiteName nameVisibleFrom="base" />
        </Group>
        <Group visibleFrom="sm">
          {/* <AuthButtonClient /> */}
          {/* <SwitchThemeIcon /> */}
        </Group>
      </Group>
    </AppShellHeader>
  );
};
