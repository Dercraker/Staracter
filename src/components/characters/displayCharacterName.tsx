'use client';

import { Text } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { AnimatedTooltip } from '../ui/animated-tooltip';

export type DisplayCharacterNameProps = {
  name: string;
};

export const DisplayCharacterName = ({ name }: DisplayCharacterNameProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const checkTruncate = () => {
      if (textRef.current) {
        setIsTruncated(
          textRef.current.scrollWidth > textRef.current.clientWidth
        );
      }
    };

    checkTruncate();
    window.addEventListener('resize', checkTruncate);

    return () => {
      window.removeEventListener('resize', checkTruncate);
    };
  }, []);

  return isTruncated ? (
    <AnimatedTooltip label={name}>
      <Text
        ref={textRef}
        fz="h2"
        fw={700}
        c="var(--mantine-color-blue-text)"
        truncate="end"
      >
        {name}
      </Text>
    </AnimatedTooltip>
  ) : (
    <Text
      ref={textRef}
      fz="h2"
      fw={700}
      c="var(--mantine-color-blue-text)"
      truncate="end"
    >
      {name}
    </Text>
  );
};
