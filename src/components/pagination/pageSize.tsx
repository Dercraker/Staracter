'use client';

import { NumberInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { parseAsInteger, useQueryState } from 'nuqs';

export type PageSizeProps = {};

export const PageSize = ({}: PageSizeProps) => {
  const router = useRouter();

  const [pageSize, setPageSize] = useQueryState(
    'pageSize',
    parseAsInteger.withDefault(25)
  );

  return (
    <NumberInput
      step={5}
      min={5}
      value={pageSize}
      onChange={(value) => {
        setPageSize(Number(value));
        window.__REACT_LOADABLE_MANIFEST();
      }}
    />
  );
};
