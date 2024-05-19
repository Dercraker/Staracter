'use server';

import { prisma } from '@/lib/prisma';
import { ActionError, authAction } from '@/lib/server-actions/safe-actions';
import { z } from 'zod';
import { DeleteFileAction } from '../blobStorage/deleteFile.action';
import { GetFileByIdQuery } from '../blobStorage/getFileById.query';
import { GetCharacterByIdQuery } from './getCharacterById.query';

const DeleteCharacterByIdSchema = z.string();

export const DeleteCharacterByIdAction = authAction(
  DeleteCharacterByIdSchema,
  async (characterId, ctx) => {
    const character = await GetCharacterByIdQuery(characterId);

    if (!character) return new ActionError('Character not found');
    if (ctx.user.id !== character.userId)
      return new ActionError('You cannot delete this character');

    const pictureFile = await GetFileByIdQuery(character.pictureId);
    if (pictureFile) await DeleteFileAction({ fileId: pictureFile.id });

    const characterFile = await GetFileByIdQuery(character.fileId);
    if (characterFile) await DeleteFileAction({ fileId: characterFile.id });

    await prisma.character.delete({
      where: {
        id: character.id,
        userId: ctx.user.id,
      },
    });
  }
);
