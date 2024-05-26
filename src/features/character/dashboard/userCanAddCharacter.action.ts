'use server';

import { env } from '@/lib/env/server';
import { authAction } from '@/lib/server-actions/safe-actions';
import { z } from 'zod';
import { GetCharacterCountByUserQuery } from './getCharacterCountByUser.query';

export const UserCanAddCharacterAction = authAction(
  z.null(),
  async (_, ctx) => {
    const count = await GetCharacterCountByUserQuery(ctx.user.id);

    return count < Number(env.POST_CHARACTER_LIMIT);
  }
);
