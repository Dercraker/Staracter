'use server';

import { ActionError, action } from '@/lib/server-actions/safe-actions';
import { z } from 'zod';
import { GetCharacterByIdQuery } from './getCharacterById.query';
import { IncrementDownloadCountQuery } from './incrementDownloadCount.query';

const IncrementDownloadCountSchema = z.object({
  characterId: z.string(),
  currentCount: z.number(),
});

export const IncrementDownloadCountAction = action(
  IncrementDownloadCountSchema,
  async ({ characterId, currentCount }) => {
    const character = await GetCharacterByIdQuery(characterId);
    if (!character) return new ActionError('Character not found');

    await IncrementDownloadCountQuery(characterId, currentCount);
  }
);
