'use server';

import { action } from '@/lib/server-actions/safe-actions';
import { GetPaginatedCharacterSchema } from './GetPaginatedCharacters.schema';
import { GetPaginatedCharactersQuery } from './getPaginatedCharacters.query';

export const GetPaginatedCharactersAction = action(
  GetPaginatedCharacterSchema,
  async ({ params, search }) => {
    return await GetPaginatedCharactersQuery({ params, search });
  }
);
