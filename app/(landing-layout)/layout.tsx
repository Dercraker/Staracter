import type { LayoutParams } from '@/types/next';
import { AppShell, AppShellMain } from '@mantine/core';
import LandingHeader from './_component/Header/LandingHeader';

const RouteLayout = ({ children }: LayoutParams) => {
  return (
    <AppShell header={{ height: 60 }}>
      <LandingHeader />
      <AppShellMain
        style={
          {
            //TODO: UNCOMMENT THIS
            // background: 'var(--mantine-color-dark-7)',
            // position: 'relative',
            // zIndex: 1,
            // marginBottom: '400px',
          }
        }
      >
        {children}
      </AppShellMain>
      {/* //TODO: UNCOMMENT THIS */}
      {/* <Footer /> */}
    </AppShell>
  );
};

export default RouteLayout;
