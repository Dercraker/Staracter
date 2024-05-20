'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export const ProgressBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="var(--mantine-color-blue-7)"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};
