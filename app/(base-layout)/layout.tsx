import type { LayoutParams } from '@/types/next';
import { AppShell, AppShellMain, Container } from '@mantine/core';
import { BaseHeader } from './_component/layout/BaseHeader';

const RouteLayout = ({ children }: LayoutParams) => {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <BaseHeader />
      <AppShellMain>
        <Container size="90vw">{children}</Container>
      </AppShellMain>
    </AppShell>
  );
};

export default RouteLayout;
