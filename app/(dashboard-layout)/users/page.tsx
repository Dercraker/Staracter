import {
  Button,
  ButtonGroup,
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
      <Group justify="space-between" align="center">
        <Stack gap={0}>
          <Title>Title of the page</Title>
          <Text c="dimmed">Description of the page</Text>
        </Stack>
        <ButtonGroup>
          <Button variant="outline">Delete</Button>
          <Button>Create</Button>
        </ButtonGroup>
      </Group>
      <Divider mb="md" />

      <Stack>
        <Text>There is the content of the page, such as text cards, etc</Text>
        <Paper p="xl" shadow="xl" withBorder>
          <Title order={2}>Content of the page</Title>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
            aliquid nemo iure deserunt delectus odit quisquam dicta error!
            Tempore dolorem deleniti eos ea a iure maxime sed cum vitae labore.
          </Text>
        </Paper>
      </Stack>
    </Container>
  );
};

export default RoutePage;
