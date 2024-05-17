import { SiteName } from '@/components/layout/SiteName';
import { Card, CardSection, Space, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { SignUpCredentialsForm } from './SignUpCredentialsForm';

const SignUpCard = () => {
  return (
    <Card
      withBorder
      w={{ base: '90vw', xs: '50vw' }}
      mx={{ base: 0, xs: '25%' }}
      py="xl"
    >
      <CardSection>
        <Stack align="center">
          <SiteName logoSize={38} />
          <Text fw="700" size="2em">
            Sign Up
          </Text>

          <SignUpCredentialsForm />

          <Text>
            You already have an account ?{' '}
            <Text
              component={Link}
              href="/auth/signin"
              fs="italic"
              td="underline"
              c="blue"
              style={{ cursor: 'pointer' }}
            >
              Sign in
            </Text>
          </Text>
        </Stack>
      </CardSection>
      <Space h="xl" />
    </Card>
  );
};

export default SignUpCard;
