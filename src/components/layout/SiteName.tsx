import { LINKS } from '@/utils/NavigationLinks';
import { SiteConfig } from '@/utils/site-config';
import type { MantineBreakpoint } from '@mantine/core';
import { Box, Group, Title } from '@mantine/core';
import Link from 'next/link';
import { z } from 'zod';
import { FullLogoSvg } from '../svg/FullLogo.svg';
import { LogoSvg } from '../svg/LogoSvg';

const siteNameVariants = z.enum(['Outline', 'Filled']);
type siteNameVariants = z.infer<typeof siteNameVariants>;

export type SiteNameProps = {
  nameVisibleFrom?: MantineBreakpoint;
  logoSize?: number;
  variant?: siteNameVariants;
};

export const SiteName = ({
  nameVisibleFrom = 'xs',
  logoSize = 24,
  variant = 'Outline',
}: SiteNameProps) => {
  return (
    <Box
      component={Link}
      href={LINKS.Landing.Landing.href}
      td="inherit"
      c="inherit"
    >
      <div data-name="toto" className="toto align-center"></div>
      <Group gap="xs">
        {variant === 'Outline' ? (
          <LogoSvg size={logoSize} />
        ) : (
          <FullLogoSvg size={logoSize} />
        )}
        <Title
          ta="center"
          order={3}
          tt="uppercase"
          visibleFrom={nameVisibleFrom}
        >
          {SiteConfig.title}
        </Title>
      </Group>
    </Box>
  );
};
