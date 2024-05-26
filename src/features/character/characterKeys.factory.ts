export const characterKeys = {
  all: ['character'] as const,

  countByUser: (userId: string) => ['CharacterCount', { userId }],

  lists: () => [...characterKeys.all, 'list'] as const,

  list: (filters: string) => [...characterKeys.lists(), { filters }] as const,

  details: () => [...characterKeys.all, 'detail'] as const,

  detail: (id: number) => [...characterKeys.details(), id] as const,
};
