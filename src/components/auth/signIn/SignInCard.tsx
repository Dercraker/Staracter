import { SiteName } from '@/components/layout/SiteName';
import type { CardProps } from '@mantine/core';
import { Card, CardSection, Group, Space, Stack, Text } from '@mantine/core';
import { SignInProviders } from './SignInProviders';

type SignInCardProps = {} & CardProps;

export const SignInCard = ({ ...props }: SignInCardProps) => {
  return (
    <Card {...props}>
      <CardSection>
        <Stack align="center">
          <Group>
            <SiteName logoSize={38} />
          </Group>
          <Text fw="700" size="2em" ta="center">
            Sign in to your account
          </Text>
        </Stack>
      </CardSection>
      <Space h="xl" />
      <CardSection>
        <SignInProviders />
      </CardSection>
    </Card>
  );
};
