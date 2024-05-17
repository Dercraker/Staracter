import type { LayoutParams } from '@/types/next';
import { AppShell, AppShellMain } from '@mantine/core';
import { AuthHeader } from './_component/AuthHeader';

const RouteLayout = ({ children }: LayoutParams) => {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AuthHeader />
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
};

export default RouteLayout;
