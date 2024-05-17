import type { LayoutParams } from '@/types/next';
import { AppShell, AppShellMain } from '@mantine/core';
import { DashboardHeader } from './_component/layout/DashboardHeader';
import { DashboardNavbar } from './_component/layout/DashboardNavbar';

export default function RouteLayout({ children }: LayoutParams) {
  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'md', collapsed: { mobile: true } }}
      padding="md"
    >
      <DashboardHeader />
      <DashboardNavbar />

      <AppShellMain
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </AppShellMain>
    </AppShell>
  );
}
