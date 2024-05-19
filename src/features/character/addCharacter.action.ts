'use server';

import { authAction } from '@/lib/server-actions/safe-actions';
import { AddCharacterQuery } from './addCharacter.query';
import { AddCharacterFormSchema } from './addCharacterForm.schema';

export const addCharacterAction = authAction(
  AddCharacterFormSchema,
  async (input, ctx) => {
    const filesToConnect = [input.fileId, input.pictureId];

    const character = await AddCharacterQuery(input, filesToConnect, ctx);

    return character;
  }
);
