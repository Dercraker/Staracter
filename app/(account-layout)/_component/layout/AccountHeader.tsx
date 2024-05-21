import AuthButton from '@/components/auth/AuthButton';
import { ContactFeedBackMenu } from '@/components/feedback/ContactFeedbackMenu';
import { SiteName } from '@/components/layout/SiteName';
import { LINKS } from '@/utils/NavigationLinks';
import { AppShellHeader, Box, Button, Container, Group } from '@mantine/core';
import Link from 'next/link';
import { AccountNavigationMobile } from '../AccountNavigationMobile';

export const AccountHeader = () => {
  return (
    <AppShellHeader>
      <Container h="100%">
        <Group h="100%" justify="space-between" px="md">
          <Box
            component={Link}
            href={LINKS.Landing.Landing.href}
            td="inherit"
            c="inherit"
          >
            <SiteName nameVisibleFrom="xs" />
          </Box>
          <Group>
            <ContactFeedBackMenu>
              <Button variant="outline">Feedback</Button>
            </ContactFeedBackMenu>
            <AuthButton />
            <AccountNavigationMobile />
          </Group>
        </Group>
      </Container>
    </AppShellHeader>
  );
};
