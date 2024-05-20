import AuthButton from '@/components/auth/AuthButton';
import { ContactFeedBackMenu } from '@/components/feedback/ContactFeedbackMenu';
import { SiteName } from '@/components/layout/SiteName';
import { AppShellHeader, Button, Container, Group } from '@mantine/core';
import { DashboardNavigationMobile } from './DashboardNavigationMobile';

export const DashboardHeader = () => {
  return (
    <AppShellHeader bg="var(--mantine-color-dark-9)">
      <Container h="100%">
        <Group align="center" justify="space-between" h="100%" hiddenFrom="md">
          <SiteName />
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
