'use server';

import { ActionError, authAction } from '@/lib/server-actions/safe-actions';
import { stripe } from '@/lib/stripe';
import { LINKS } from '@/utils/NavigationLinks';
import { getServerUrl } from '@/utils/server-url';
import { z } from 'zod';

const BuyButtonSchema = z.object({
  priceId: z.string(),
});

export const buyButtonAction = authAction(
  BuyButtonSchema,
  async (data, ctx) => {
    const { priceId } = data;

    const stripeCustomerId = ctx.user.stripeCustomerId ?? undefined;

    const price = await stripe.prices.retrieve(priceId);

    const priceType = price.type;

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: priceType === 'one_time' ? 'payment' : 'subscription',
      payment_method_types: ['card', 'link'],
      customer_creation: !stripeCustomerId ? 'always' : undefined,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: `${getServerUrl()}${LINKS.Payment.Success.href}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getServerUrl()}${LINKS.Payment.Cancel.href}`,
    });

    if (!session.url) {
      throw new ActionError('Something went wrong while creating the session.');
    }

    return { url: session.url };
  }
);
