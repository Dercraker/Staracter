import AuthButton from '@/components/auth/AuthButton';
import { SiteName } from '@/components/layout/SiteName';
import { DASHBOARD_NAVIGATION_LINKS, LINKS } from '@/utils/NavigationLinks';
import {
  AppShellNavbar,
  Box,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import Link from 'next/link';

export const DashboardNavbar = () => {
  return (
    <AppShellNavbar>
      <Stack p="xs" h="100vh" justify="space-between">
        <Stack>
          <SiteName />
          <Paper
            component={Link}
            href={LINKS.Dashboard.Dashboard.href}
            c="inherit"
            bg="var(--mantine-color-dark-6)"
            p="xs"
          >
            <Group>
              {LINKS.Dashboard.Dashboard.icon}
              {LINKS.Dashboard.Dashboard.label}
            </Group>
          </Paper>
          <Divider size="sm" />

          {DASHBOARD_NAVIGATION_LINKS.map((group, idx) => {
            const items = group.links.map((link, idx) => (
              <Paper key={idx} withBorder p="xs">
                <Box component={Link} href={link.href} td="inherit" c="inherit">
                  <Group align="center">
                    {link.icon}
                    {link.label}
                  </Group>
                </Box>
              </Paper>
            ));

            return (
              <Box key={idx}>
                <Text c="dimmed">{group.title}</Text>
                <Stack gap="0.3em">{items}</Stack>
              </Box>
            );
          })}
        </Stack>
        <Group>
          <AuthButton loggedButtonVariant="outline" />
        </Group>
      </Stack>
    </AppShellNavbar>
  );
};
