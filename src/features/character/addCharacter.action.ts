'use server';

import { env } from '@/lib/env/server';
import { prisma } from '@/lib/prisma';
import { ActionError, authAction } from '@/lib/server-actions/safe-actions';
import { AddCharacterQuery } from './addCharacter.query';
import { AddCharacterFormSchema } from './addCharacterForm.schema';

export const addCharacterAction = authAction(
  AddCharacterFormSchema,
  async (input, ctx) => {
    const playerCharacterCount = await prisma.character.count({
      where: {
        userId: ctx.user.id,
      },
    });

    if (playerCharacterCount >= Number(env.POST_CHARACTER_LIMIT))
      throw new ActionError(
        'You have reached the character limit. You cannot add more.'
      );

    const filesToConnect = [input.fileId, input.pictureId];

    const character = await AddCharacterQuery(input, filesToConnect, ctx);

    return character;
  }
);
