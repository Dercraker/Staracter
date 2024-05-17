import AuthButton from '@/components/auth/AuthButton';
import { ContactFeedBackMenu } from '@/components/feedback/ContactFeedbackMenu';
import { SiteName } from '@/components/layout/SiteName';
import { LINKS } from '@/utils/NavigationLinks';
import { AppShellHeader, Box, Button, Container, Group } from '@mantine/core';
import Link from 'next/link';
import { DashboardNavigationMobile } from './DashboardNavigationMobile';

export const DashboardHeader = () => {
  return (
    <AppShellHeader>
      <Container h="100%">
        <Group align="center" justify="space-between" h="100%" hiddenFrom="md">
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
            <ContactFeedBackMenu>
              <Button variant="outline">Feedback</Button>
            </ContactFeedBackMenu>
            <DashboardNavigationMobile />
          </Group>
        </Group>
        <Group align="center" justify="end" h="100%" visibleFrom="md">
          <ContactFeedBackMenu>
            <Button variant="outline">Feedback</Button>
          </ContactFeedBackMenu>
        </Group>
      </Container>
    </AppShellHeader>
  );
};
