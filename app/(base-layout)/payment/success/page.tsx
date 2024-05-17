import { LINKS } from '@/utils/NavigationLinks';
import { Button, Group, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';

const RoutePage = () => {
  return (
    <Stack>
      <Title>Thank You for Your Purchase!</Title>
      <Text>
        Your payment was successful! You now have full access to all our premium
        resources. If you have any questions, we're here to help.
      </Text>
      <Group>
        <Button component={Link} href={LINKS.Landing.Landing.href}>
          Get Started
        </Button>
      </Group>
    </Stack>
  );
};

export default RoutePage;
