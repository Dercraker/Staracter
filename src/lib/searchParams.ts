import {
  createSearchParamsCache,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server';

export const searchParamsCache = createSearchParamsCache({
  tag: parseAsString,
  search: parseAsString.withOptions({
    shallow: false,
    scroll: true,
  }),
  token: parseAsString.withDefault(''),
  success: parseAsBoolean.withDefault(false),
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(25),
});
