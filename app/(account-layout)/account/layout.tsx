import { requiredAuth } from '@/lib/auth/helper';
import type { LayoutParams } from '@/types/next';
import { Paper, Text, Title } from '@mantine/core';
import { VerifyEmailButton } from './verify-email/_component/VerifyEmailButton';

const RouteLayout = async (props: LayoutParams) => {
  const user = await requiredAuth();

  const isEmailNotVerified = user.email && !user.emailVerified;
  return (
    <>
      {isEmailNotVerified ? (
        <Paper withBorder radius="lg" shadow="lg" p="xl">
          <Title order={3}>Email not verified</Title>
          <Text>Please verify your email to access your account.</Text>
          <VerifyEmailButton />
        </Paper>
      ) : null}
      {props.children}
    </>
  );
};

export default RouteLayout;
