import AuthButton from '@/components/auth/AuthButton';
import { SiteName } from '@/components/layout/SiteName';
import { LINKS } from '@/utils/NavigationLinks';
import { AppShellHeader, Box, Container, Group } from '@mantine/core';
import Link from 'next/link';

type BaseHeaderProps = {
  size?: string;
  fluid?: boolean;
};

export const BaseHeader = ({ size, fluid }: BaseHeaderProps) => {
  return (
    <AppShellHeader>
      <Container size={size ? size : '90vh'} h="100%" fluid={fluid}>
        <Group h="100%" justify="space-between" px="md">
          <Box
            component={Link}
            href={LINKS.Landing.Landing.href}
            td="inherit"
            c="inherit"
          >
            <SiteName />
          </Box>
          <Group>
            <AuthButton />
            {/* <SwitchThemeIcon /> */}
          </Group>
        </Group>
      </Container>
    </AppShellHeader>
  );
};
