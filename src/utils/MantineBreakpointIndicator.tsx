'use client';

import { Box, Portal, useMatches } from '@mantine/core';

export const MantineBreakpointIndicator = () => {
  const breakpoint = useMatches({
    base: 'BASE',
    xs: 'XS',
    sm: 'SM',
    md: 'MD',
    lg: 'LG',
    xl: 'XL',
  });

  return (
    <Portal>
      <Box
        pos="fixed"
        left={0}
        bottom={0}
        style={{ zIndex: 9999 }}
        bg="var(--mantine-color-black)"
        fw={700}
        m="sm"
      >
        {breakpoint}
      </Box>
    </Portal>
  );
};
