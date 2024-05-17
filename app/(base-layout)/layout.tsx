import Footer from '@/components/layout/footer/Footer';
import type { LayoutParams } from '@/types/next';
import { AppShell, AppShellMain, Container } from '@mantine/core';
import { BaseHeader } from './_component/layout/BaseHeader';

const RouteLayout = ({ children }: LayoutParams) => {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <BaseHeader />
      <AppShellMain
        style={{
          background: 'var(--mantine-color-dark-7)',
          position: 'relative',
          zIndex: 1,
          marginBottom: '400px',
        }}
      >
        <Container size="90vw">{children}</Container>
      </AppShellMain>
      <Footer />
    </AppShell>
  );
};

export default RouteLayout;
