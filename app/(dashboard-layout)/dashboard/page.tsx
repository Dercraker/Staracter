import {
  Button,
  Container,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';

const RoutePage = () => {
  return (
    <Container>
      <Stack>
        <Title>Dashboard</Title>
        <Divider mb="md" />
        <Group>
          <Paper p="xl" shadow="xl" withBorder w={{ base: '90vw', xs: 'auto' }}>
            <Title order={3}>Thread Created</Title>
            <Text>201</Text>
          </Paper>
          <Paper p="xl" shadow="xl" withBorder w={{ base: '90vw', xs: 'auto' }}>
            <Title order={3}>Thread Published</Title>
            <Text>177</Text>
          </Paper>
          <Paper p="xl" shadow="xl" withBorder w={{ base: '90vw', xs: 'auto' }}>
            <Title order={3}>Actions</Title>
            <Button variant="outline">New Post</Button>
          </Paper>
        </Group>
      </Stack>
    </Container>
  );
};

export default RoutePage;
