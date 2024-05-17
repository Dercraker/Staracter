'use client';

import { QueryClient } from '@tanstack/react-query';
import moment from 'moment';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: moment.duration(30, 'minutes').asMilliseconds(),
      retry: 2,
    },
  },
});
