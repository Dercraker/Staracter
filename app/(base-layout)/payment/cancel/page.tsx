import { ContactSupportDialog } from '@/components/contact/support/ContactSupportDialog';
import { LINKS } from '@/utils/NavigationLinks';
import { Badge, Button, Group, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';

const RoutePage = () => {
  return (
    <Stack>
      <Badge variant="outline">Payment failed</Badge>
      <Title>We're sorry, but we couldn't process your payment</Title>
      <Text>
        We encountered an issue processing your payment.
        <br /> Please check your payment details and try again. <br />
        If the problem persists, don't hesitate to contact us for assistance.
        <br />
        We're here to help you resolve this smoothly.
      </Text>
      <Group>
        <Button component={Link} href={LINKS.Landing.Landing.href}>
          Home
        </Button>
        <ContactSupportDialog />
      </Group>
    </Stack>
  );
};

export default RoutePage;
