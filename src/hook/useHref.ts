import { useIsClient } from '@/hook/useIsClient';

export const useHref = () => {
  const isClient = useIsClient();

  if (!isClient) {
    return '';
  }

  const href = window.location.href;

  return `${href}`;
};
