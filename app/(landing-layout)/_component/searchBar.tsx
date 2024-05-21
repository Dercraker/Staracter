'use client';

import type {
  CharacterTag,
  GetAllCharacterTagsQuery,
} from '@/features/character/getAllCharacterTags.query';
import { Badge, Group, Stack, TextInput } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import { parseAsString, useQueryState } from 'nuqs';
import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';

export type SearchBarProps = {
  allTags: GetAllCharacterTagsQuery;
};

export const SearchBar = ({ allTags }: SearchBarProps) => {
  const [currentTag, setCurrentTag] = useQueryState('tag', parseAsString);
  const [search, setSearch] = useQueryState('search', {
    shallow: false,
    scroll: true,
  });
  const [page, setPage] = useQueryState('page', {
    shallow: false,
    scroll: true,
  });
  const [inputValue, setInputValue] = useState(search);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
    handleSearch(event.currentTarget.value);

    if (event.currentTarget.value.length === 0)
      await new Promise((resolve) =>
        setTimeout(() => {
          handleSearch(event.currentTarget.value);

          resolve;
        }, 300)
      );
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);

    if (value != search && page !== '1') setPage('1');
  }, 200);

  const badges = useMemo(() => {
    return allTags.map((tag: CharacterTag) => (
      <Badge
        key={tag.id}
        variant={currentTag === tag.name ? 'filled' : 'dot'}
        onClick={() => setCurrentTag(tag.name)}
      >
        {tag.name}
      </Badge>
    ));
  }, [allTags, currentTag, setCurrentTag]);

  return (
    <Stack align="center">
      <TextInput
        miw="20em"
        w="50vw"
        value={inputValue || ''}
        placeholder="Search your favorite character"
        onChange={handleChange}
      />
      <Group className="select-none">
        {currentTag && (
          <IconX
            color="var(--mantine-color-red-9)"
            stroke={2}
            onClick={() => setCurrentTag(null)}
          />
        )}
        {badges}
      </Group>
    </Stack>
  );
};
