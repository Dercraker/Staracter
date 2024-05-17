import { ContactSupportDialog } from '@/components/contact/support/ContactSupportDialog';
import { requiredAuth } from '@/lib/auth/helper';
import { stripe } from '@/lib/stripe';
import { getServerUrl } from '@/utils/server-url';
import { Badge, Button, Card, Paper, Text, Title } from '@mantine/core';

export default async function BillingProfilePage() {
  const user = await requiredAuth();

  if (!user.stripeCustomerId) {
    return (
      <Paper radius="lg" p="xl" withBorder my="md">
        <Badge color="red">Error</Badge>
        <Title order={2}>You account is not linked to a billing account</Title>
        <Text>{`You can't do nothing. Please contact the support`}</Text>
        <ContactSupportDialog />
      </Paper>
    );
  }

  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${getServerUrl()}/account/billing`,
  });

  return (
    <Card>
      <Title>Billing Information</Title>
      <Text>Plan : {user.plan}</Text>
      <Button component="a" href={stripeSession.url}>
        Update Billing informations
      </Button>
    </Card>
  );
}
