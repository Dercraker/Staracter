import type { LayoutParams } from '@/types/next';
import { AppShell, AppShellMain, Container } from '@mantine/core';
import { AccountNavigation } from './_component/AccountNavigation';
import { AccountHeader } from './_component/layout/AccountHeader';

const RouteLayout = (props: LayoutParams) => {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AccountHeader />
      <AppShellMain>
        <Container>
          <AccountNavigation>{props.children}</AccountNavigation>
        </Container>
      </AppShellMain>
    </AppShell>
  );
};

export default RouteLayout;
