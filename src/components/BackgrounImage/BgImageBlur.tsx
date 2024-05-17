import { Box, Image } from '@mantine/core';
import type { PropsWithChildren } from 'react';

type BgImageBlurProps = PropsWithChildren<{
  height: string;
  imageUrl: string;
  width: string;
  blur?: string;
  radius?: string;
  alt: string;
}>;

export const BgImageBlur = (props: BgImageBlurProps) => {
  return (
    <Box pos="relative" display="inline-block">
      <Image
        src={props.imageUrl}
        alt={props.alt}
        h={props.height}
        w={props.width}
        radius={props.radius}
      />
      <Box
        pos="absolute"
        top={0}
        left={0}
        h={props.height}
        w={props.width}
        style={{
          backdropFilter: `blur(${props.blur})`,
          borderRadius: props.radius,
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};
