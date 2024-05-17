import { ContactSupportDialog } from '@/components/contact/support/ContactSupportDialog';
import { requiredAuth } from '@/lib/auth/helper';
import { env } from '@/lib/env/server';
import { resend } from '@/lib/mail/resend';
import { Badge, Paper, Text, Title } from '@mantine/core';
import { ToggleEmailCheckbox } from './_component/ToggleEmailCheckbox';

const MailProfilePage = async () => {
  const user = await requiredAuth();

  if (!user.resendContactId) {
    return <ErrorComponent />;
  }

  if (!env.RESEND_AUDIENCE_ID) {
    return <ErrorComponent />;
  }

  const { data: resendUser } = await resend.contacts.get({
    audienceId: env.RESEND_AUDIENCE_ID,
    id: user.resendContactId,
  });

  if (!resendUser) {
    return <ErrorComponent />;
  }

  return (
    <Paper radius="lg" p="xl" withBorder my="md">
      <Title order={2}>Mail settings</Title>
      <Text>
        Update your email notifications settings to match your preferences
      </Text>
      <ToggleEmailCheckbox unsubscribed={resendUser.unsubscribed} />
      <ContactSupportDialog />
    </Paper>
  );
};

export default MailProfilePage;

const ErrorComponent = () => {
  return (
    <Paper radius="lg" p="xl" withBorder my="md">
      <Badge color="red">Error</Badge>
      <Title>Resend Not Found</Title>
      <Text>{`We couldn't find your Resend contact. Please contact support.`}</Text>
      <ContactSupportDialog />
    </Paper>
  );
};
