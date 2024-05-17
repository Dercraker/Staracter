'use server';

import { sendEmail } from '@/lib/mail/sendEmail';
import { prisma } from '@/lib/prisma';
import { ActionError, authAction } from '@/lib/server-actions/safe-actions';
import { LINKS } from '@/utils/NavigationLinks';
import { getServerUrl } from '@/utils/server-url';
import VerifyEmail from '@email/VerifyEmail';
import moment from 'moment';
import { nanoid } from 'nanoid';
import { z } from 'zod';

export const createVerifyEmailAction = authAction(
  z.string(),
  async (_, { user }) => {
    if (user.emailVerified) {
      throw new ActionError('Email is already verified');
    }

    const verificationToken = await prisma.verificationToken.create({
      data: {
        identifier: user.email,
        expires: moment().add(1, 'day').toDate(),
        token: nanoid(32),
      },
    });

    await sendEmail({
      to: user.email,
      subject: 'Verify your email',
      react: VerifyEmail({
        url: `${getServerUrl()}${LINKS.Account.VerifyEmail.href}?token=${
          verificationToken.token
        }`,
      }),
    });
  }
);
