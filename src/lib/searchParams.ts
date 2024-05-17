import {
  createSearchParamsCache,
  parseAsBoolean,
  parseAsString,
} from 'nuqs/server';

export const searchParamsCache = createSearchParamsCache({
  token: parseAsString.withDefault(''),
  success: parseAsBoolean.withDefault(false),
});
