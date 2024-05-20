'use server';

import { ActionError, authAction } from '@/lib/server-actions/safe-actions';
import { GetCharacterByIdQuery } from '../getCharacterById.query';
import { GetCharacterLikeByUserQuery } from './getCharacterLikeByUser.query';
import { LikeCharacterQuery } from './likeCharacter.query';
import { LikeCharacterSchema } from './likeCharacter.schema';
import { UnlikeCharacterQuery } from './unlikeCharacter.query';

export const LikeCharacterAction = authAction(
  LikeCharacterSchema,
  async ({ characterId }, { user: { id: userId } }) => {
    const character = await GetCharacterByIdQuery(characterId);

    if (!character) throw new ActionError('Character not found');

    const like = await GetCharacterLikeByUserQuery({
      characterId,
      userId: userId,
    });

    if (like) await UnlikeCharacterQuery({ characterId, userId });
    else await LikeCharacterQuery({ characterId, userId });
  }
);
