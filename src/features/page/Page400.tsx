import {
  Badge,
  Button,
  Center,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import Link from 'next/link';

export const Page400 = () => {
  return (
    <Container size="sm">
      <Center h="100vh">
        <Stack justify="center" align="center" ta="center">
          <Badge color="red" radius="sm" variant="outline">
            400
          </Badge>
          <Title order={1}>Oh No! Unexpected Error.</Title>
          <Text>
            It seems we're experiencing some technical difficulties. Not to
            worry, our team is working on it. In the meantime, try refreshing
            the page or visiting us a bit later.
          </Text>
          <Group justify="center" align="center">
            <Button variant="outline" component={Link} href="/">
              Go back home
            </Button>
            <Button variant="outline">Contact Support</Button>
          </Group>
        </Stack>
      </Center>
    </Container>
  );
};
